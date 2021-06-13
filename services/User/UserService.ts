import AxiosService from "services/AxiosService";
import Firebase from 'utils/Firebase';
import { QueryIncompleteUserInformation, BasicUserInformation, WooCommerceCustomer, UserInformation } from "services/domain/User";
import { Auth, QueryDocument, QuerySuccessMessage, User } from 'services/domain/Database';
import UserDatabaseClient from "./UserDatabaseClient";
import UserAdapter from "./UserAdapter";

class UserService {
  private static instance:UserService;
  private readonly axiosService:typeof AxiosService;
  private readonly db:typeof UserDatabaseClient;
  private readonly auth:Auth;
  private readonly adapter:typeof UserAdapter;
  private constructor(
    axiosService:typeof AxiosService,
    db:typeof UserDatabaseClient,
    auth:Auth,
    adapter:typeof UserAdapter
  ) {
    this.axiosService = axiosService;
    this.db = db;
    this.auth = auth;
    this.adapter = adapter;
  }

  static getInstance():UserService {
    if (!UserService.instance) UserService.instance = new UserService(AxiosService, UserDatabaseClient, Firebase.auth, UserAdapter);

    return UserService.instance;
  }

  public async loginUser(email:string, password:string):Promise<User> {
    const { user } = await this.auth.login(email, password);

    return user;
  }

  public async signupUserAndAddToDatabse(email:string, password:string, userInformation:BasicUserInformation | QueryIncompleteUserInformation):Promise<UserInformation> {
    const { user } = await this.auth.signup(email, password);
    const queryData = this.adapter.newUserClientToUserDatabase(user, userInformation);
    const data = await this.db.addUserInformation(queryData);
    return this.adapter.userDatabaseToUserClient(user, data);
  }

  public async secretSignupAndDatabaseAdd(email:string, password:string) {
    const queryUser = await this.db.findUserByEmail(email);

    if (this.doesNotExistsInDatabase(queryUser)) {
      const user = this.adapter.existingUserToUserDatabase(queryUser);
      return this.signupUserAndAddToDatabse(email, password, user);
    }

    const user = await this.loginUser(email, password);

    return this.adapter.userDatabaseToUserClient(user, queryUser);
  }

  public async resetPassword(email:string) {
    return await this.auth.sendPasswordReset(email);
  }

  public async modifyUser(userInformation:BasicUserInformation, userId:string):Promise<UserInformation> {
    const data = await this.db.modifyUserData(userInformation, userId);
    return data as UserInformation;
  }

  public async updatePassword(email:string, oldPassword:string, newPassword:string):Promise<QuerySuccessMessage> {
    return await this.auth.updatePassword(email, oldPassword, newPassword);
  }

  public get findUserBy() {
    return {
      email: (email:string) => this.db.findUserByEmail(email),
      id: (id:number) => this.db.findUserById(id),
    }
  }

  private doesNotExistsInDatabase(user:QueryDocument | WooCommerceCustomer):user is WooCommerceCustomer {
    return !('wooId' in user);
  };
}

export default UserService.getInstance();
