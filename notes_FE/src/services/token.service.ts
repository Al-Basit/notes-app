import Cookies from "js-cookie";

import {
  cookieAuth,
  cookieData,
  cookieRefresh,
  tokenRetries,
} from "@/lib/cookies";
import { userType } from "@/lib/types/user";

class TokenService {
  getLocalAccessToken = () => {
    return Cookies.get(cookieAuth);
  };
  saveLocalAccessToken = (token: string) => {
    Cookies.set(cookieAuth, token, { sameSite: "strict" });
  };
  getLocalRefreshToken = () => {
    return Cookies.get(cookieRefresh);
  };
  saveLocalRefreshToken = (token: string) => {
    Cookies.set(cookieRefresh, token);
  };
  getUser = (): null | userType => {
    return JSON.parse(localStorage.getItem(cookieData)!);
  };
  getUserId = (): number | null => {
    const user = this.getUser();
    return user?.id || null;
  };
  getRoleId = (): number | null => {
    const user = this.getUser();
    return user?.roleId || null;
  };
  setUser = (user: userType) => {
    localStorage.setItem(cookieData, JSON.stringify(user));
  };
  updateUser = <T extends keyof userType>(key: T, value: userType[T]) => {
    const userObject = this.getUser();
    if (userObject) {
      userObject[key] = value;
      this.setUser(userObject);
    } else {
      throw new Error("Error");
    }
  };
  setTokenRetries = (retries: number) => {
    localStorage.setItem(tokenRetries, retries.toString());
  };
  getTokenRetries = () => {
    return parseInt(localStorage.getItem(tokenRetries)!);
  };
  clearStorage = () => {
    localStorage.clear();
    Cookies.remove(cookieAuth);
    Cookies.remove(cookieData);
  };
}
export default new TokenService();
