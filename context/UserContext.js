import React from "react";

export const UserContext = React.createContext({
  isSignedIn: false,
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});
