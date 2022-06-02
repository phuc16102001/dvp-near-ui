import { Contract } from 'near-api-js'
import { TWO_YOCTO_NEAR, nearConfig, executeMultipleTransactions } from './near.js'

export async function initFaucetContract() {
  window.faucetContract = await new Contract(window.walletConnection.account(), nearConfig.faucetContractName, {
    viewMethods: ['get_info', 'shared_balance_of'],
    changeMethods: ['faucet_token'],
  })
}

export async function faucetToken(faucetAmount) {
    let transferTx = {
        receiverId: nearConfig.faucetContractName,
        functionCalls: [{
            methodName: "faucet_token",
            args: {
                amount: String(faucetAmount),
            },
            gas: "60000000000000",
            amount: TWO_YOCTO_NEAR
        }]
    }
    let transactions = [transferTx]
    await executeMultipleTransactions(transactions);
}
