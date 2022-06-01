import React, { useEffect } from "react";
import TokenCard from "../../components/TokenCard";
import { useState } from "react";

const TokenPage = () => {
  const [tokenIcon, setTokenIcon] = useState();
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [totalSupply, setTotalSupply] = useState();

  useEffect(() => {
    window.contract.ft_metadata().then((data) => {
      setTokenIcon(data.icon);
      setTokenName(data.name);
      setTokenSymbol(data.symbol);
    });
    window.contract
      .ft_total_supply()
      .then((totalSupply) => setTotalSupply(totalSupply));
  }, []);

  return (
    <>
      <div>
        <TokenCard
          icon={tokenIcon}
          tokenName={tokenName}
          symbol={tokenSymbol}
          totalSupply={totalSupply}
        />
      </div>
    </>
  );
};

export default TokenPage;
