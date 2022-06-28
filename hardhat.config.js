require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.2",
  networks: {
    rinkeby: {
      url: process.env.NEXT_PUBLIC_RENKEBY_URL || "",
      accounts:
        process.env.NEXT_PUBLIC_RENKEBY_SECRET !== undefined ? [process.env.NEXT_PUBLIC_RENKEBY_SECRET] : [],
    },
    arbitrum: {
      url: 'https://rinkeby.arbitrum.io/rpc',
      accounts:
        process.env.NEXT_PUBLIC_RENKEBY_SECRET !== undefined ? [process.env.NEXT_PUBLIC_RENKEBY_SECRET] : [],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
