import { useContext, Dispatch, SetStateAction } from "react";
import { AppContext } from "../Context/AppContext";
import { useRouter } from "next/router";
import ApiService from "services/ApiService";
import { BasicUserInformation, UserInformation } from "services/domain/User";

type UseAuthProps = {
  email?: string;
  password?: string;
};

export function useAuth() {
  const { id, connected, login, logout, userInformations, updateUserInformation } = useContext(AppContext);
  const router = useRouter();

  const handleAuth = async (
    { email, password }: UseAuthProps,
    onError?: (e:string) => void,
  ) => {
    try {
      const response = await ApiService.fetch({
        url: '/api/login',
        method: 'POST',
        data: {
          email,
          password,
        }
      });

      const user:UserInformation = response.data;

      if (response.status === 200) {
        login(user);
      }
    } catch (e) {
      onError &&
        onError("Le nom d'utilisateur ou le mot de passe est incorrect.");
    }
  };

  const handleSignUp = async (
    formData: any,
    onError?: Dispatch<SetStateAction<string>>,
    callback?: () => void
  ) => {
    try {
      const response = await ApiService.fetch({
        url: '/api/signup',
        method: 'POST',
        data: formData,
      });
      const user:UserInformation = response.data;
      if (response.status !== 200) {
        throw new Error(
          "L'utilisateur existe déjà. Veuillez vous connecter ou utiliser une autre adresse courriel."
        );
      }
      if (user) {
        callback && callback();
        login(user);

        return router.push("/");
      }
    } catch (e) {
      onError &&
        onError(
          "L'utilisateur existe déjà. Veuillez vous connecter ou utiliser une autre adresse courriel."
        );
    }
  };

  const signOut = async () => {
    const response = await ApiService.fetch({
      url: '/api/signout',
      method: 'POST'
    });

    const isSignedOut = response.data;

    if (isSignedOut) {
      logout();
    }
  }

  const isAuthenticated = connected;

  const userId = id;

  const userInfo = userInformations;

  const update = (userInformations:BasicUserInformation) => updateUserInformation(userInformations);

  return { 
    handleAuth,
    handleSignUp,
    signOut,
    update,
    isAuthenticated,
    userId,
    userInfo,
  };
}
