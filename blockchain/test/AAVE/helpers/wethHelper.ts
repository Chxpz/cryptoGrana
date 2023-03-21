import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumberish, ethers } from "ethers";
import {ERC20ABI} from "./ABIs/ERC20Abi.json";

interface DepositWETHParams {
    ERC20Token: string;
    amount: BigNumberish;
    signer: SignerWithAddress;
}

export function depositERC20({
    ERC20Token,
    amount,
    signer
}:DepositWETHParams): Promise<ethers.providers.TransactionResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            const ERC20TokenContract = new ethers.Contract(ERC20Token, ERC20ABI, signer);
            const tx = await ERC20TokenContract.deposit({ value: amount });
            resolve(tx);
        } catch (error) {
            reject(error);
        }
    })
}
