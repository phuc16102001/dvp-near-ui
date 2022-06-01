import React from "react";
import { login, logout } from "../../utils/near";
import { LoginOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router";

const menuItem = ["Token", "Transfer", "Staking", "Faucet"].map((key) => ({
  key: key.toLowerCase(),
  label: key,
}));

const Header = () => {
  let navigate = useNavigate();
  return (  
    <header>
      <div className="p-2 absolute right-0">
        {!window.walletConnection.isSignedIn() ? (
          <Button
            type="default"
            onClick={login}
            shape="round"
            icon={<LoginOutlined />}
          >
            Login
          </Button>
        ) : (
          <Button
            className="float-right justify-center"
            type="default"
            onClick={logout}
            shape="round"
          >
            {window.walletConnection.getAccountId()} | Logout
          </Button>
        )}
      </div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["token"]}
        items={menuItem}
        onClick={(item) => navigate(`/${item.key}`)}
      />
    </header>
  );
};

export default Header;
