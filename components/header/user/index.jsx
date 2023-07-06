import React from "react";
import { useSelector } from "react-redux";
import UserAccountBtn from "./UserAccountBtn";
import LoginBtn from "./LoginBtn";

const User = () => {
  const userInfo = false;
  return <div className="pl-5">{userInfo ? <UserAccountBtn /> : <LoginBtn />}</div>;
};

export default User;
