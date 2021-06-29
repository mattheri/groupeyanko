import { DatabaseCollection, BasicUserInformation, WooCommerceCustomer, UserInformation } from 'services/domain/User';
import { Firestore } from 'services/domain/Database';
import { AxiosResponse } from 'axios';
import AxiosService from 'services/AxiosService';
import Firebase from 'utils/Firebase';

class UserDatabaseClient {
  private static instance:UserDatabaseClient;
  private readonly firestore:Firestore;
  private readonly axiosService:typeof AxiosService;

  private constructor(firestore:Firestore, axiosService:typeof AxiosService) {
    this.firestore = firestore;
    this.axiosService = axiosService;
  }

  static getInstance():UserDatabaseClient {
    if (!UserDatabaseClient.instance) UserDatabaseClient.instance = new UserDatabaseClient(Firebase.firestore.db, AxiosService);

    return UserDatabaseClient.instance;
  }

  public async addUserInformation(userInformation:BasicUserInformation) {
    const queryData = await (await this.userTable.add(userInformation)).get();
    const data = { id: queryData.id, ...queryData.data() };
    return data;
  }

  public async findUserByEmail(email:string) {
    const customer = await this.userTable.where('email', '==', email).get();

    if (!!customer) return customer.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];

    const response:AxiosResponse<WooCommerceCustomer[]> = await this.axiosService.get({
      url: `customers?email=${email}`,
    });

    const previousCustomer = response.data[0];

    return previousCustomer;
  }

  public async modifyUserData(userInformation:BasicUserInformation, userId:string):Promise<{id:string,[x:string]:any}> {
    const customer = this.userTable.doc(userId);
    await customer.update(userInformation);
    const data = (await customer.get()).data();
    return { id: userId, ...data };
  }

  public async findUserById(id:number) {
    const query = await this.userTable.doc(`${id}`).get();

    return { id: query.id, ...query.data() };
  }

  private get userTable() {
    return this.firestore.collection(DatabaseCollection.Users);
  }
}

export default UserDatabaseClient.getInstance();
