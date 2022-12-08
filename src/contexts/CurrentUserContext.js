import React from "react";

export const userContex = React.createContext({});

export const apiBack = React.createContext({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});
