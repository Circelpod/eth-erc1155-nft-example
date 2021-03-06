/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 require("ts-node").register({
  files: true,
});

 const HDWalletProvider = require("truffle-hdwallet-provider");

 const MNEMONIC = process.env.MNEMONIC;
 const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
 const isInfura = !!process.env.INFURA_KEY;
 
 const needsNodeAPI =
   process.env.npm_config_argv &&
   (process.env.npm_config_argv.includes("rinkeby") ||
     process.env.npm_config_argv.includes("live"));
 
 if ((!MNEMONIC || !NODE_API_KEY) && needsNodeAPI) {
   console.error("Please set a mnemonic and ALCHEMY_KEY or INFURA_KEY.");
   process.exit(0);
 }
 
 const rinkebyNodeUrl = isInfura
   ? "https://rinkeby.infura.io/v3/" + NODE_API_KEY
   : "https://eth-rinkeby.alchemyapi.io/v2/" + NODE_API_KEY;
 
 const mainnetNodeUrl = isInfura
   ? "https://mainnet.infura.io/v3/" + NODE_API_KEY
   : "https://eth-mainnet.alchemyapi.io/v2/" + NODE_API_KEY;

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "localhost",
      port: 7545,
      gas: 5000000,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, rinkebyNodeUrl);
      },
      gas: 5000000,
      network_id: 4,
    },
    live: {
      network_id: 1,
      provider: function () {
        return new HDWalletProvider(MNEMONIC, mainnetNodeUrl);
      },
      gas: 5000000,
      gasPrice: 5000000000,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      gasPrice: 2,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11", 
      settings: {
        optimizer: {
          enabled: true,
          runs: 20   // Optimize for how many times you intend to run the code
        },
      },   // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
