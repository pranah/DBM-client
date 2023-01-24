export const pranaAddress = "0xFAcb9B8d1770A37fbb95424359Cc2A3798642d8e";
export const pranaHelperAddress = "0x16f7dA5c67F1466fF13D288230d1936cEa105cba";
export const chain = {
  name: "Mumbai",
  title: "Polygon Testnet Mumbai",
  chain: "Polygon",
  rpc: ["https://rpc-mumbai.matic.today/"],
  faucets: ["https://faucet.polygon.technology/"],
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  infoURL: "https://polygon.technology/",
  shortName: "maticmum",
  chainId: 80001,
  networkId: 80001,
  explorers: [
    {
      name: "polygonscan",
      url: "https://mumbai.polygonscan.com",
      standard: "EIP3091",
    },
  ],
};
