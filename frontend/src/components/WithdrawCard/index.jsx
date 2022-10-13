import React from "react";
import { Button } from "antd";

const UnstakeCard = (props) => {
  const unstakedBalance = props.unstakedBalance || 0;
  const symbol = props.symbol || "";
  const canWithdraw = props.canWithdraw || false;
  const unstakeStartTime = props.unstakeStartTime || 0;
  const onSubmit = props.onSubmit;
  const time = new Date(unstakeStartTime / 1_000_000);
  const predict_time = new Date((unstakeStartTime / 1_000_000) + 12*60*60*1000);

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h1>Withdraw information</h1>
      <div className="p-2 grid grid-cols-2 gap-x-2">
        <div>Unstaked balance:</div>
        <div>
          {unstakedBalance} {symbol}
        </div>
        <div>Unstaked start time:</div>
        <div>{time.toLocaleString()}</div>
        <div>Unstaked estimated time:</div>
        <div>{predict_time.toLocaleString()}</div>
        <div className="col-span-2 text-xs text-red-600">You can withdraw after 1 epoch (~12 hours)</div>
      </div>
      <div className="flex flex-col">
        <Button
          className="mb-2 mt-2"
          type="primary"
          onClick={onSubmit}
          disabled={!canWithdraw}
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default UnstakeCard;
