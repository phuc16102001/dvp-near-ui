import { keyStores, Near, utils } from 'near-api-js'
import getConfig from './config'
import { functionCall } from 'near-api-js/lib/transaction';
import BN from 'bn.js';
import MyWalletConnection from './my-wallet';
import { initFtContract } from './ft-api';
import { initFaucetContract } from './faucet-api';

export const nearConfig = getConfig(process.env.NODE_ENV || 'development')
export const ONE_YOCTO_NEAR = '0.000000000000000000000001';
export const TWO_YOCTO_NEAR = '0.000000000000000000000002';
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

  await initFtContract();
  await initFaucetContract();
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
