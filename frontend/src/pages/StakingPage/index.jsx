import React, { useEffect, useState } from "react";
import PoolCard from "../../components/PoolCard";
import StakingCard from "../../components/StakingCard";
import WithdrawCard from "../../components/WithdrawCard";
import {
  stakeBalance,
  unstakeBalance,
  harvestReward,
  withdraw,
} from "../../utils/staking-api";

const StakingPage = () => {
  const [totalStaker, setTotalStaker] = useState(0);
  const [totalStakedBalance, setTotalStakedBalance] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [stakingAPR, setStakingAPR] = useState(0);

  const [tokenSymbol, setTokenSymbol] = useState();

  const [userStakedBalance, setUserStakedBalance] = useState(0);
  const [userReward, setUserReward] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [stakeUnstakeAmount, setStakeUnstakeAmount] = useState(0);
  const [selectStake, setSelectStake] = useState("stake");

  const [userUnstakedBalance, setUserUntakedBalance] = useState(0);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [unstakeStartTime, setUnstakeStartTime] = useState(0);

  const refreshData = async () => {
    let poolInfo = await window.stakingContract.get_pool_info();
    setTotalStaker(poolInfo.total_staker);
    setTotalStakedBalance(poolInfo.total_stake_balance);
    setTotalReward(poolInfo.total_reward);
    setStakingAPR(18);

    let metadata = await window.ftContract.ft_metadata();
    setTokenSymbol(metadata.symbol);

    let currentUserBalance = await window.ftContract.ft_balance_of({
      account_id: window.walletConnection.getAccountId(),
    });
    setUserBalance(currentUserBalance);

    if (window.walletConnection.isSignedIn()) {
      let registered = await window.stakingContract.exist_account({
        account_id: window.walletConnection.getAccountId(),
      });
      if (registered === true) {
        let userStakeInfo = await window.stakingContract.get_account_info({
          account_id: window.walletConnection.getAccountId(),
        });
        setUserStakedBalance(userStakeInfo.stake_balance);
        setUserUntakedBalance(userStakeInfo.unstake_balance);
        setUserReward(userStakeInfo.reward);
        setCanWithdraw(userStakeInfo.can_withdraw);
        setUnstakeStartTime(userStakeInfo.unstake_start_timestamp);
      }
    }
  };

  const onStakeUnstake = () => {
    if (selectStake) {
      stakeBalance(window.walletConnection.getAccountId(), stakeUnstakeAmount);
    } else {
      unstakeBalance(stakeUnstakeAmount);
    }
  };

  const onHarvest = () => {
    harvestReward();
  };

  const onWithdraw = () => {
    withdraw();
  };

  useEffect(() => {
    refreshData();
    console.log(selectStake)
  }, [selectStake]);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="m-2">
            <PoolCard
              numberOfStaker={totalStaker}
              totalStakedBalance={totalStakedBalance}
              totalReward={totalReward}
              stakingAPR={stakingAPR}
              symbol={tokenSymbol}
            />
          </div>
          <div className="m-2">
            <WithdrawCard
              symbol={tokenSymbol}
              onSubmit={onWithdraw}
              canWithdraw={canWithdraw}
              unstakeStartTime={unstakeStartTime}
              unstakedBalance={userUnstakedBalance}
            />
          </div>
        </div>
        <div className="m-2">
          <StakingCard
            userStakedBalance={userStakedBalance}
            userReward={userReward}
            userBalance={userBalance}
            selectStake={selectStake}
            setSelectStake={setSelectStake}
            symbol={tokenSymbol}
            onStakeUnstake={onStakeUnstake}
            onHarvest={onHarvest}
            stakeUnstakeAmount={stakeUnstakeAmount}
            onChangeStakeUnstakeAmount={setStakeUnstakeAmount}
          />
        </div>
      </div>
    </>
  );
};

export default StakingPage;
