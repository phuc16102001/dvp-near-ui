import React from "react";
import { login, logout } from "../../utils/near";
import { LoginOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";

const menuItem = ["Token", "Transfer"].map((key) => ({
  key: key.toLowerCase(),
  label: key,
}));

const Header = () => {
  return (
    <>
      {!window.walletConnection.isSignedIn() ? (
        <Button
          className="float-right mt-1.5 mr-2"
          type="default"
          onClick={login}
          shape="round"
          icon={<LoginOutlined />}
        >
          Login
        </Button>
      ) : (
        <Button
          className="float-right mt-1.5 mr-2"
          type="default"
          onClick={logout}
          shape="round"
        >
          {window.walletConnection.getAccountId()} | Logout
        </Button>
      )}
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["token"]}
        items={menuItem}
      ></Menu>
    </>
  );
};

export default Header;
