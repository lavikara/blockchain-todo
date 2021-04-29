module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    privatebc: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "4224",
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "^0.7.0",
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
  db: {
    enabled: false,
  },
};
