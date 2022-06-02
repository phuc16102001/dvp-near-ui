import React, { useEffect, useState } from "react";
import TransferForm from "../../components/TransferForm";
import { transferToken } from "../../utils/ft-api";

const TransferPage = () => {
  const [metadata, setMetaData] = useState({});
  const [accountBalance, setAccountBalance] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferTo, setTransferTo] = useState("");
  const [memo, setMemo] = useState("");

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
    transferToken(transferTo, transferAmount, memo);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <TransferForm
      accountId={window.walletConnection.getAccountId()}
      balance={accountBalance}
      metadata={metadata}
      transferAmount={transferAmount}
      onChangeTransferAmount={setTransferAmount}
      transferTo={transferTo}
      onChangeTransferTo={setTransferTo}
      memo={memo}
      onChangeMemo={setMemo}
      onSubmit={handleTransferToken}
    />
  );
};

export default TransferPage;
