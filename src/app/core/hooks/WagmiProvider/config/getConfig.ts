export function getConfig() {
  // if (process.env.NODE_ENV === "development") {
  //   const { devConfig, devChains } = require("./devConfig");
  //   return { chains: devChains, config: devConfig };
  // }

  // if (process.env.NEXT_PUBLIC_TEST_CONNECTOR === "true") {
  //   const { chains, config } = require("./testConfig");
  //   return { chains, config };
  // }

  const { chains, transports } = require("./prodConfig");
  return { chains, transports };
}
