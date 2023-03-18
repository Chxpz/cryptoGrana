
import * as dotenv from "dotenv";
import { HardhatUserConfig} from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
//import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers:[{
      version:"0.8.17"
    }],
    settings: {
         optimizer: {
           enabled: true,
         runs: 2000,
         }},
  },
  networks: {
    hardhat: 
    {
      forking:{
      url: "https://eth-mainnet.g.alchemy.com/v2/3gdK4NWm1_d8epP07VBl6cjUN6XveEbf",
      }
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD"
  },
    etherscan: {
	apiKey: process.env.ETHERSCAN_API_KEY,
	// customChains: [
	//     {
	// 	network: "opttesting",
	// 	chainId: 420,
	// 	urls: {
	// 	    apiURL: "https://api-goerli-optimism.etherscan.io/api",
	// 	    browserURL: "https://goerli-optimism.etherscan.io"
	// 	}
	//     }
	// ]
    }
};

export default config;
