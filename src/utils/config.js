const FAUCET_CONTRACT_NAME = 'faucet.phuc16102001.testnet'
const FT_CONTRACT_NAME = 'ft.phuc16102001.testnet'
const STAKING_CONTRACT_NAME = 'dev-1654255489604-90346948389505'

function getConfig(env) {
  switch (env) {

  case 'production':
  case 'mainnet':
    return {
      networkId: 'mainnet',
      nodeUrl: 'https://rpc.mainnet.near.org',
      stakingContractName: STAKING_CONTRACT_NAME,
      ftContractName: FT_CONTRACT_NAME,
      faucetContractName: FAUCET_CONTRACT_NAME,
      walletUrl: 'https://wallet.near.org',
      helperUrl: 'https://helper.mainnet.near.org',
      explorerUrl: 'https://explorer.mainnet.near.org',
    }
  case 'development':
  case 'testnet':
    return {
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      stakingContractName: STAKING_CONTRACT_NAME,
      ftContractName: FT_CONTRACT_NAME,
      faucetContractName: FAUCET_CONTRACT_NAME,
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    }
  case 'betanet':
    return {
      networkId: 'betanet',
      nodeUrl: 'https://rpc.betanet.near.org',
      stakingContractName: STAKING_CONTRACT_NAME,
      ftContractName: FT_CONTRACT_NAME,
      faucetContractName: FAUCET_CONTRACT_NAME,
      walletUrl: 'https://wallet.betanet.near.org',
      helperUrl: 'https://helper.betanet.near.org',
      explorerUrl: 'https://explorer.betanet.near.org',
    }
  case 'local':
    return {
      networkId: 'local',
      nodeUrl: 'http://localhost:3030',
      keyPath: `${process.env.HOME}/.near/validator_key.json`,
      stakingContractName: STAKING_CONTRACT_NAME,
      walletUrl: 'http://localhost:4000/wallet',
      faucetContractName: FAUCET_CONTRACT_NAME,
      ftContractName: FT_CONTRACT_NAME,
    }
  case 'test':
  case 'ci':
    return {
      networkId: 'shared-test',
      stakingContractName: STAKING_CONTRACT_NAME,
      nodeUrl: 'https://rpc.ci-testnet.near.org',
      faucetContractName: FAUCET_CONTRACT_NAME,
      ftContractName: FT_CONTRACT_NAME,
      masterAccount: 'test.near',
    }
  case 'ci-betanet':
    return {
      networkId: 'shared-test-staging',
      stakingContractName: STAKING_CONTRACT_NAME,
      nodeUrl: 'https://rpc.ci-betanet.near.org',
      faucetContractName: FAUCET_CONTRACT_NAME,
      ftContractName: FT_CONTRACT_NAME,
      masterAccount: 'test.near',
    }
  default:
    throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`)
  }
}

module.exports = getConfig
