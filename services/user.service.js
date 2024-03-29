import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(
  typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  register,
};

async function login(username, password) {
  const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {
    username,
    password,
  });

  // publish user to subscribers and store in local storage to stay logged in between page refreshes
  userSubject.next(user);
  localStorage.setItem("user", JSON.stringify(user));
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/account/login");
}

async function register(user) {
  await fetchWrapper.post(`${baseUrl}/register`, user);
}
