import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, InputNumber, Input, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { transferToken } from "../../utils/near";

const TransferPage = () => {
  const [metadata, setMetaData] = useState({});
  const [accountBalance, setAccountBalance] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferTo, setTransferTo] = useState("");

  const getBalance = async () => {
    let balance = 0;
    if (window.walletConnection.isSignedIn()) {
      balance = await window.contract.ft_balance_of({
        account_id: window.walletConnection.getAccountId(),
      });
    }
    setAccountBalance(balance);
  };

  const getMetadata = async () => {
    setMetaData(await window.contract.ft_metadata());
  };

  const refreshData = () => {
    Promise.all([getMetadata(), getBalance()]);
  };

  const handleTransferToken = () => {
    console.log(transferAmount)
    transferToken(transferTo, transferAmount);
  };

  useEffect(() => {
    refreshData();
  }, [
    window.walletConnection.isSignedIn(),
    window.walletConnection.getAccountId(),
  ]);

  return (
    <div className="p-5 bg-white rounded-lg">
      <h1>Account information</h1>
      <div className="p-2 grid grid-cols-2">
        <div>Account id:</div>
        <div>{window.walletConnection.getAccountId()}</div>
        <div>Balance:</div>
        <div>
          {accountBalance} {metadata.symbol}
        </div>
      </div>
      <hr className="m-2" />
      <h1>Transfer</h1>
      <div className="flex flex-col">
        <InputNumber
          className="mt-2 mb-2"
          placeholder="Amount"
          min={0}
          max={accountBalance}
          value={transferAmount}
          onChange={setTransferAmount}
          addonAfter={metadata.symbol}
        />
        <Input
          value={transferTo}
          onChange={(e)=>{setTransferTo(e.target.value)}}
          className="mt-2 mb-2"
          placeholder="To"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        <Button className="mb-2 mt-2" type="primary" onClick={handleTransferToken}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default TransferPage;
