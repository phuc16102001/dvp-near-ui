import React from "react";
import { Button, InputNumber, Input } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

const TransferForm = (props) => {
  let accountId = props.accountId || "";
  let accountBalance = props.balance || 0;
  let metadata = props.metadata || {};
  let transferAmount = props.transferAmount || 0;
  let onChangeTransferAmount = props.onChangeTransferAmount;
  let transferTo = props.transferTo || "";
  let onChangeTransferTo = props.onChangeTransferTo;
  let memo = props.memo;
  let onChangeMemo = props.onChangeMemo;
  let onSubmit = props.onSubmit;

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h1>Account information</h1>
      <div className="p-2 grid grid-cols-2">
        <div>Account id:</div>
        <div>{accountId}</div>
        <div>Balance:</div>
        <div>
          {accountBalance} {metadata.symbol}
        </div>
      </div>
      <hr className="m-2" />
      <h1>Transfer</h1>
      <div className="flex flex-col">
        <Input
          value={transferTo}
          onChange={(e) => {
            onChangeTransferTo(e.target.value);
        }}
          className="mt-2 mb-2"
          placeholder="To"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        <InputNumber
          className="mt-2 mb-2"
          placeholder="Amount"
          min={0}
          max={accountBalance}
          value={transferAmount}
          onChange={onChangeTransferAmount}
          addonBefore={metadata.symbol}
        />
        <Input
          value={memo}
          onChange={(e) => {
            onChangeMemo(e.target.value);
        }}
          className="mt-2 mb-2"
          placeholder="Memo"
          prefix={<MailOutlined className="site-form-item-icon" />}
        />
        <Button
          className="mb-2 mt-2"
          type="primary"
          onClick={onSubmit}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default TransferForm;
