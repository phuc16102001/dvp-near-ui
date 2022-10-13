import React, { useEffect, useState } from "react";
import FaucetCard from "../../components/FaucetCard";
import faucet_token, { faucetToken } from "../../utils/faucet-api"

const FaucetPage = () => {
  const [tokenSymbol, setTokenSymbol] = useState(0);
  const [totalSharedAccount, setTotalSharedAccount] = useState(0);
  const [currentSharedBalance, setCurrentSharedBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [maxShareBalance, setMaxShareBalance] = useState(0);
  const [sharedBalanceOf, setSharedBalanceOf] = useState(0);
  const [faucetAmount, onChangeFaucetAmount] = useState(0);

  const refreshData = async () => {
    let metadata = await window.ftContract.ft_metadata();
    setTokenSymbol(metadata.symbol);

    let info = await window.faucetContract.get_info();
    setTotalSharedAccount(info.total_share_account);
    setCurrentSharedBalance(info.current_shared_balance);
    setAvailableBalance(info.available_balance);
    setMaxShareBalance(info.max_share_per_account);

    let sharedBalance = await window.faucetContract.shared_balance_of({
      account_id: window.walletConnection.getAccountId(),
    });
    setSharedBalanceOf(sharedBalance);
  };

  const onFaucetReceive = () => {
    faucetToken(faucetAmount);
  }

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div>
      <FaucetCard
        tokenSymbol={tokenSymbol}
        totalSharedAccount={totalSharedAccount}
        currentSharedBalance={currentSharedBalance}
        availableBalance={availableBalance}
        maxShareBalance={maxShareBalance}
        sharedBalanceOf={sharedBalanceOf}
        faucetAmount={faucetAmount}
        onChangeFaucetAmount={onChangeFaucetAmount}
        onSubmit={onFaucetReceive}
      />
    </div>
  );
};

export default FaucetPage;
