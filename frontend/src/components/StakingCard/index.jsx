import React from "react";
import { Radio, InputNumber, Button } from "antd";

const StakingCard = (props) => {
  const symbol = props.symbol || "";
  const userStakedBalance = props.userStakedBalance || 0;
  const userReward = props.userReward || 0;
  const userBalance = props.userBalance || 0;

  const selectStake = props.selectStake || true;
  const setSelectStake = props.setSelectStake;
  const stakeUnstakeAmount = props.stakeUnstakeAmount || 0;
  const onChangeStakeUnstakeAmount = props.onChangeStakeUnstakeAmount;
  const onStakeUnstake = props.onStakeUnstake;
  const onHarvest = props.onHarvest;

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <div className="flex flex-col">
        <h1>Staking information</h1>
        <div className="p-2 grid grid-cols-2 gap-x-2">
          <div>Total staked balance:</div>
          <div>
            {userStakedBalance} {symbol}
          </div>
          <div>Total reward:</div>
          <div>
            {userReward} {symbol}
          </div>
        </div>
        <div>
          <Button
            className="mb-2 mt-2 w-full"
            type="primary"
            onClick={onHarvest}
            disabled={userReward === 0}
          >
            Harvest
          </Button>
        </div>
      </div>

      <hr className="m-2" />
      <div className="flex flex-col">
        <div className="m-3 w-full flex justify-center">
          <Radio.Group
            defaultValue={selectStake}
            onChange={(e) => {
              setSelectStake(e.target.value);
            }}
            size="medium"
            buttonStyle="solid"
          >
            <Radio.Button value={"stake"}>Stake</Radio.Button>
            <Radio.Button value={"unstake"}>Unstake</Radio.Button>
          </Radio.Group>
        </div>
        <div className="p-2 grid grid-cols-2 gap-x-2">
          <div>Your balance:</div>
          <div>
            {userBalance} {symbol}
          </div>
        </div>

        <InputNumber
          className="mt-2 mb-2"
          placeholder="Amount"
          min={0}
          max={selectStake==="stake" ? userBalance : userStakedBalance}
          value={stakeUnstakeAmount}
          onChange={onChangeStakeUnstakeAmount}
          addonBefore={symbol}
        />
        <Button
          className="mb-2 mt-2"
          type="primary"
          onClick={onStakeUnstake}
          disabled={stakeUnstakeAmount === 0}
        >
          {selectStake==="stake" ? <div>Stake</div> : <div>Unstake</div>}
        </Button>
      </div>
      <div className="flex flex-col"></div>
    </div>
  );
};

export default StakingCard;
