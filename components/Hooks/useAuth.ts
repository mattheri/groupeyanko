import { useContext, Dispatch, SetStateAction } from "react";
import { AppContext } from "../Context/AppContext";
import { useRouter } from "next/router";
import ApiService from "services/ApiService";
import { BasicUserInformation, UserInformation } from "services/domain/User";
import { ApiResponse } from "services/domain/Api";

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
      const response:ApiResponse<UserInformation> = await ApiService.post({
        url: '/api/login',
        data: {
          email,
          password,
        }
      });

      const user = response.data;

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
      const response:ApiResponse<UserInformation> = await ApiService.post({
        url: '/api/signup',
        data: formData,
      });
      const user = response.data;
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
    const response:ApiResponse<boolean> = await ApiService.post({
      url: '/api/signout',
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
