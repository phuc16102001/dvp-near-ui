import { ConnectedWalletAccount, WalletConnection } from "near-api-js"
import { createTransaction } from "near-api-js/lib/transaction";
import { baseDecode } from 'borsh';
import { PublicKey } from 'near-api-js/lib/utils';

export default class MyWalletConnection extends WalletConnection {

    _walletAccount;

    account = () => {
        if (!this._walletAccount) {
            this._walletAccount = new MyWalletAccount(
                this,
                this._near.connection,
                this._authData.accountId
            );
        }
        return this._walletAccount;
    }

    createTransaction = ({receiverId, actions, nonceOffset = 1}) => {
        return this._walletAccount.createTransaction({ receiverId, actions, nonceOffset });
    }
}

class MyWalletAccount extends ConnectedWalletAccount {
    async createTransaction({ receiverId, actions, nonceOffset }) {
        const localKey = await this.connection.signer.getPublicKey(
            this.accountId,
            this.connection.networkId
        );
        let accessKey = await this.accessKeyForTransaction(
            receiverId,
            actions,
            localKey
        );
        if (!accessKey) {
            throw new Error(
                `Cannot find matching key for transaction sent to ${receiverId}`
            );
        }

        const block = await this.connection.provider.block({ finality: 'final' });
        const blockHash = baseDecode(block.header.hash);

        const publicKey = PublicKey.from(accessKey.public_key);
        const nonce = accessKey.access_key.nonce + nonceOffset;

        return createTransaction(
            this.accountId,
            publicKey,
            receiverId,
            nonce,
            actions,
            blockHash
        );
    }
}