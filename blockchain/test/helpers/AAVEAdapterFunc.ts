import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { BigNumberish, providers, ethers } from "ethers";

interface SupplyTokensParams {
    contract: Contract;
    signer: SignerWithAddress
    pool: string;
    token: string;
    amount: BigNumberish;
    referralCode: BigNumberish;
}

export async function supplyTokens({
    contract,
    signer,
    pool,
    token,
    amount,
    referralCode
}: SupplyTokensParams): Promise<providers.TransactionResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await contract.connect(signer).supplyTokens(
                pool,
                token,
                amount,
                referralCode
            )
            resolve(tx);
        } catch (error) {
            reject(error);
        }
    })
}