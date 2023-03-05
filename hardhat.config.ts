import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";
import "hardhat-abi-exporter";
import "hardhat-log-remover";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    mainnet: {
      url: `https://mainnet.infura.io/v3/82dca944771944fc83df032e7dc6a288`,
      accounts: [process.env.MAINNET_PRIVATE_KEY || ""],
    },
    // goerli: {
    //   // url: `https://eth-goerli.g.alchemy.com/v2/${process.env.GOERLI_API_KEY}`,
    //   url: `https://goerli.infura.io/v3/55b2b5a032a04258bcf0962ef86c6f61`,
    //   accounts: [process.env.GOERLI_PRIVATE_KEY || ""],
    // },
  },
  gasReporter: {
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
    enabled: true,
  },
  etherscan: {
    apiKey: "CYNIDQEBB9DZNDENE5HHFXT8TJWKZPF7X9",
  },
  abiExporter: [
    {
      path: "./abi/pretty",
      pretty: true,
    },
    {
      path: "./abi/ugly",
      pretty: false,
    },
  ],
};

export default config;
