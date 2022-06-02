import { Contract, keyStores, Near, utils, WalletAccount, WalletConnection } from 'near-api-js'
import getConfig from './config'
import { functionCall } from 'near-api-js/lib/transaction';
import BN from 'bn.js';
import MyWalletConnection from './my-wallet';

export const nearConfig = getConfig(process.env.NODE_ENV || 'development')
export const ONE_YOCTO_NEAR = '0.000000000000000000000001';
export const STAKING_STORAGE_AMOUNT = '0.01';

export async function initContract() {
  const near = new Near({
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    headers: {},
    ...nearConfig,
  });

  window.Buffer = window.Buffer || require("buffer").Buffer;
  window.walletConnection = new MyWalletConnection(near)
  window.accountId = window.walletConnection.getAccountId()

  window.ftContract = await new Contract(window.walletConnection.account(), nearConfig.ftContractName, {
    viewMethods: ['ft_metadata', 'ft_balance_of', 'ft_total_supply', 'storage_balance_of'],
    changeMethods: ['ft_transfer', 'storage_deposit'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  window.walletConnection.requestSignIn()
}

export async function executeMultipleTransactions(transactions, callbackUrl) {
  const nearTransactions = await Promise.all(
    transactions.map((tx, i) => {
      return window.walletConnection.createTransaction({
        receiverId: tx.receiverId,
        nonceOffset: i + 1,
        actions: tx.functionCalls.map((fc) =>
          functionCall(
            fc.methodName,
            fc.args,
            new BN(fc.gas),
            new BN(utils.format.parseNearAmount(fc.amount))
          )
        ),
      })
    }),
  )
  await window.walletConnection.requestSignTransactions(nearTransactions, callbackUrl);
};
