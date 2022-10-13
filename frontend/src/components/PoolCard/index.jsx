import React from 'react'

const PoolCard = (props) => {
  const totalStakedBalance = props.totalStakedBalance || 0;
  const numberOfStaker = props.numberOfStaker || 0;
  const totalReward = props.totalReward || 0;
  const stakingAPR = props.stakingAPR || 0;
  const symbol = props.symbol || "";

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h1>Pool information</h1>
      <div className="p-2 grid grid-cols-2 gap-x-2">
        <div>Total staked balance:</div>
        <div>{totalStakedBalance} {symbol}</div>
        <div>Number of staker:</div>
        <div>{numberOfStaker} accounts</div>
        <div>Total reward earned:</div>
        <div>{totalReward} {symbol}</div>
        <div>Staking APR:</div>
        <div>{stakingAPR} %</div>
      </div>
    </div>
  )
}

export default PoolCard