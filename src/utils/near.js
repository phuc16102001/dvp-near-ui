import { Contract, keyStores, WalletConnection, Near, utils } from 'near-api-js'
import getConfig from './config'
import { functionCall, createTransaction } from 'near-api-js/lib/transaction';
import { baseDecode } from 'borsh';
import { PublicKey } from 'near-api-js/lib/utils';
import BN from 'bn.js';

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
  window.walletConnection = new WalletConnection(near)
  window.accountId = window.walletConnection.getAccountId()

  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    viewMethods: ['ft_metadata', 'ft_balance_of', 'ft_total_supply', 'storage_balance_of'],
    changeMethods: ['ft_transfer', 'storage_deposit'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export async function executeMultipleTransactions(transactions, callbackUrl) {
  const nearTransactions = await Promise.all(
    transactions.map((tx, i) => {
      console.log(tx)
      let tranx = myCreateTransaction({
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
      return tranx;
    }),
  )
  console.log(nearTransactions)
  await window.walletConnection.requestSignTransactions(nearTransactions, callbackUrl);
};

async function myCreateTransaction({ receiverId, actions, nonceOffset = 1 }) {
  const localKey = await window.walletConnection.account().connection.signer.getPublicKey(
    window.walletConnection.getAccountId(),
    window.walletConnection.networkId
  );
  let accessKey = await window.walletConnection.account().accessKeyForTransaction(
    receiverId,
    actions,
    localKey
  );
  if (!accessKey) {
    throw new Error(
      `Cannot find matching key for transaction sent to ${receiverId}`
    );
  }

  const block = await window.walletConnection.account().connection.provider.block({ finality: 'final' });
  const blockHash = baseDecode(block.header.hash);

  const publicKey = PublicKey.from(accessKey.public_key);
  const nonce = accessKey.access_key.nonce + nonceOffset;

  return createTransaction(
    window.walletConnection.getAccountId(),
    publicKey,
    receiverId,
    nonce,
    actions,
    blockHash
  );
}