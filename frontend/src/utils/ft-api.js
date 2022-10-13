import { nearConfig, ONE_YOCTO_NEAR, STAKING_STORAGE_AMOUNT, executeMultipleTransactions } from './near.js'
import { Contract } from 'near-api-js'

export async function initFtContract() {
  window.ftContract = await new Contract(window.walletConnection.account(), nearConfig.ftContractName, {
    viewMethods: ['ft_metadata', 'ft_balance_of', 'ft_total_supply', 'storage_balance_of'],
    changeMethods: ['ft_transfer', 'storage_deposit'],
  })
}

export async function transferToken(transferTo, transferAmount, memo) {
    let transferTx = {
        receiverId: nearConfig.ftContractName,
        functionCalls: [{
            methodName: "ft_transfer",
            args: {
                receiver_id: transferTo,
                amount: String(transferAmount),
                memo: memo
            },
            gas: "60000000000000",
            amount: ONE_YOCTO_NEAR
        }]
    }
    let transactions = [transferTx]

    let registered = await window.ftContract.storage_balance_of({
        account_id: transferTo
    });

    if (registered === null) {
        let depositTx = {
            receiverId: nearConfig.ftContractName,
            functionCalls: [{
                methodName: "storage_deposit",
                args: {
                    account_id: transferTo,
                    registery_only: true
                },
                gas: "10000000000000",
                amount: STAKING_STORAGE_AMOUNT
            }]
        }
        transactions.unshift(depositTx);
    }
    await executeMultipleTransactions(transactions);
}
