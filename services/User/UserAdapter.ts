import { BasicUserInformation, WooCommerceCustomer, UserInformation, ClientUser, QueryIncompleteUserInformation } from "services/domain/User";
import { QueryDocument, User } from 'services/domain/Database';

type UserInformationWithoutId = Omit<UserInformation, "id">;

class UserAdapter {
  private static instance:UserAdapter;
  private constructor() {}

  static getInstance() {
    if (!UserAdapter.instance) UserAdapter.instance = new UserAdapter();

    return UserAdapter.instance;
  }

  public userDatabaseToUserClient(user:User, data:QueryDocument):UserInformation {
    const { email } = user;

    return {
      id: data.id,
      address: data.address,
      city: data.city,
      company: data.company,
      email,
      firstname: data.firstname,
      lastname: data.lastname,
      phoneNumber: data.phoneNumber,
      postalCode: data.postalCode,
      province: data.province,
      wooId: data.wooId,
    }
  }

  public newUserClientToUserDatabase(user:User, data:BasicUserInformation | QueryIncompleteUserInformation):UserInformationWithoutId {
    const { email } = user;
    const id = this.isQueryIncompleteUserInformation(data) ? data.wooId : 0;

    return {
      ...data,
      email,
      wooId: id,
    }
  }

  public existingUserToUserDatabase(previousCustomer:WooCommerceCustomer):QueryIncompleteUserInformation {
  
    const {
      id,
      first_name,
      last_name,
      billing: {
        address_1,
        address_2,
        city: queryCity,
        company: queryCompany,
        phone,
        postcode,
        state,
      }
    } = previousCustomer;

    const address1 = this.valueExists(address_1);
    const address2 = this.valueExists(address_2)
    const address = `${address1} ${address2}`;
    const firstname = this.valueExists(first_name);
    const lastname = this.valueExists(last_name);
    const city = this.valueExists(queryCity);
    const company = this.valueExists(queryCompany);
    const phoneNumber = this.valueExists(phone);
    const postalCode = this.valueExists(postcode);
    const province = this.valueExists(state);
    const wooId = id ? id : 0;

    return {
      firstname,
      lastname,
      address,
      phoneNumber,
      city,
      company,
      postalCode,
      province,
      wooId,
    }
  }

  public isUserInformation(data:QueryDocument):data is UserInformation {
    const keys = Object.keys(data);
    const defaultKeys = [
      'id',
      'address',
      'city',
      'company',
      'email',
      'firstname',
      'lastname',
      'phoneNumber',
      'postalCode',
      'province',
      'wooId',
    ]
    if (keys.every((key) => defaultKeys.some((dKey) => dKey === key))) return true;

    return false;
  }

  private valueExists(value:string) {
    return !!value ? value : '';
  }

  private isQueryIncompleteUserInformation(tbd:BasicUserInformation | QueryIncompleteUserInformation):tbd is QueryIncompleteUserInformation {
    return !('wooId' in tbd);
  }
}

export default UserAdapter.getInstance();