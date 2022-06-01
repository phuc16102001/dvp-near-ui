import React from "react";
import { Card as AntCard } from "antd";
import './style.css'

const TokenCard = (props) => {
  let icon = props.icon || "";
  let symbol = props.symbol || "SYM";
  let tokenName = props.tokenName || "Name";
  let totalSupply = props.totalSupply || 0;
  return (
    <div className="site-card-border-less-wrapper">
      <AntCard
        title={symbol}
        extra={<img src={icon} alt="icon" className="w-8 h-8 rounded"/>}
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <p>Token name: {tokenName}</p>
        <p>Total supply: {totalSupply}</p>
      </AntCard>
    </div>
  );
};

export default TokenCard;
