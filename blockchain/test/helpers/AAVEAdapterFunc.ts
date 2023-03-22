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

interface BorrowTokensParams{
    contract: Contract;
    signer: SignerWithAddress;
    pooldataProvider: string;
    pool: string;
    token: string;
    amount: BigNumberish;
    interestRateMode: BigNumberish;
    referralCode: BigNumberish;
    onBehalfOf: string;
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

export async function borrowTokens({
    contract,
    signer,
    pooldataProvider,
    pool,
    token,
    amount,
    interestRateMode,
    referralCode,
    onBehalfOf
}: BorrowTokensParams): Promise<providers.TransactionResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await contract.connect(signer).borrowTokens(
                pooldataProvider,
                pool,
                token,
                amount,
                interestRateMode,
                referralCode,
                onBehalfOf
            )
            resolve(tx);
        } catch (error) {
            reject(error);
        }
    })
}