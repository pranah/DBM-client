export const pranaAddress = "0xff97bC38Be807cffA640F75B859A930983851053";
export const pranaHelperAddress = "0xA50ba7F0829dFA906855A683C85f6513253EF70f";
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
