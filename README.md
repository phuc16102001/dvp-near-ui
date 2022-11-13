# DVP Application Frontend

<div>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</div>

## Introduction

Blockchain technologies are very hard and require a high technical skill to use. Because of that reason, to become user-friendly, frontend UI is important. This is a repository of a website that provides usability on a token called DVP (Do Vuong Phuc) with different features:

- **View information:** view tokens's metadata such as icon, symbol, name and balance of current user
- **Faucet:** Withdraw tokens with a limit amount (test-purpose)
- **Transfer:** Send tokens to the other users
- **Staking:** Deposit token and receive reward after some interval of time

## Gallery

<p align="center">
  <img width="640" height="300" src="res/ui.png">
</p>
<p align="center">
    <b>Staking view</b>
</p>

## Code exploration
The application builds with ReactJS framework with the structure as following:
- `components`: The components which are used on pages
- `pages`: The pages of application
- `utils`: The utility services for interact with contracts

## Smart contracts
In the application, I have used several relative smart contracts:
- [Fungible token](contract/fungible-token)
- [Faucet contract](contract/faucet-contract)
- [Staking contract](contract/staking-contract)

## Contributions
This source code is owned by [phuc16102001](https://github.com/phuc16102001)

## License
[MIT](LICENSE)
