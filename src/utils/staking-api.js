import { Contract } from 'near-api-js'
import { ONE_YOCTO_NEAR, STAKING_STORAGE_AMOUNT, nearConfig, executeMultipleTransactions } from './near.js'

export async function initStakingContract() {
    window.stakingContract = await new Contract(window.walletConnection.account(), nearConfig.stakingContractName, {
        viewMethods: ['get_pool_info', 'get_account_info', 'exist_account', 'is_paused', 'get_version'],
        changeMethods: ['storage_deposit', 'harvest', 'unstake', 'withdraw'],
    })
}

export async function stakeBalance(accountId, stakeAmount) {
    let transferTx = {
        receiverId: nearConfig.ftContractName,
        functionCalls: [{
            methodName: "ft_transfer_call",
            args: {
                receiver_id: nearConfig.stakingContractName,
                amount: String(stakeAmount),
                msg: "Staking token deposit"
            },
            gas: "60000000000000",
            amount: ONE_YOCTO_NEAR
        }]
    }
    let transactions = [transferTx]

    let registered = await window.stakingContract.exist_account({
        account_id: accountId
    });

    if (registered === false) {
        let depositTx = {
            receiverId: nearConfig.stakingContractName,
            functionCalls: [{
                methodName: "storage_deposit",
                args: {
                    account_id: accountId,
                },
                gas: "10000000000000",
                amount: STAKING_STORAGE_AMOUNT
            }]
        }
        transactions.unshift(depositTx);
    }
    await executeMultipleTransactions(transactions);
}

export async function unstakeBalance(unstakeAmount) {
    let transferTx = {
        receiverId: nearConfig.stakingContractName,
        functionCalls: [{
            methodName: "unstake",
            args: {
                amount: String(unstakeAmount),
            },
            gas: "60000000000000",
            amount: ONE_YOCTO_NEAR
        }]
    }
    let transactions = [transferTx]
    await executeMultipleTransactions(transactions);
}

export async function withdraw() {
    let transferTx = {
        receiverId: nearConfig.stakingContractName,
        functionCalls: [{
            methodName: "withdraw",
            args: {},
            gas: "60000000000000",
            amount: ONE_YOCTO_NEAR
        }]
    }
    let transactions = [transferTx]
    await executeMultipleTransactions(transactions);
}

export async function harvestReward() {
    let transferTx = {
        receiverId: nearConfig.stakingContractName,
        functionCalls: [{
            methodName: "harvest",
            args: {},
            gas: "60000000000000",
            amount: ONE_YOCTO_NEAR
        }]
    }
    let transactions = [transferTx]
    await executeMultipleTransactions(transactions);
}
