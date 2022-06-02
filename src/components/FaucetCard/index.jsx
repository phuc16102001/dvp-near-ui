import React from "react";
import { InputNumber, Button } from "antd";

const FaucetCard = (props) => {
  const tokenSymbol = props.tokenSymbol || "";
  const totalSharedAccount = props.totalSharedAccount || 0;
  const sharedBalanceOf = props.sharedBalanceOf || 0;
  const currentSharedBalance = props.currentSharedBalance || 0;
  const availableBalance = props.availableBalance || 0;
  const maxShareBalance = props.maxShareBalance || 0;
  const faucetAmount = props.faucetAmount || 0;
  const onChangeFaucetAmount = props.onChangeFaucetAmount;
  const onSubmit = props.onSubmit;

  return (
    <div>
      <div className="p-5 bg-white rounded-lg">
        <h1>Faucet pool</h1>
        <div className="p-2 grid gap-x-3 grid-cols-2">
          <div>Total shared accounts:</div>
          <div>{totalSharedAccount} accounts</div>
          <div>Curent shared balance:</div>
          <div>
            {currentSharedBalance} {tokenSymbol}
          </div>
          <div>Available balance:</div>
          <div>
            {availableBalance} {tokenSymbol}
          </div>
          <div>Max share/account:</div>
          <div>{maxShareBalance}/account</div>
        </div>
        <hr className="m-2" />
        <h1>Faucet</h1>
        <div className="p-2 grid gap-x-3 grid-cols-2">
          <div>Your shared amount:</div>
          <div>{sharedBalanceOf}/{maxShareBalance} {tokenSymbol}</div>
        </div>
        <div className="flex flex-col">
          <InputNumber
            className="mt-2 mb-2"
            placeholder="Amount"
            min={0}
            disabled={!window.walletConnection.isSignedIn()}
            max={maxShareBalance - sharedBalanceOf}
            value={faucetAmount}
            onChange={onChangeFaucetAmount}
            addonBefore={tokenSymbol}
          />
          <Button className="mb-2 mt-2" type="primary" onClick={onSubmit}>
            Receive
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaucetCard;
