import * as fs from "fs";
import { ethers } from "hardhat";

async function main() {
  const Prana = await ethers.getContractFactory("prana");
  const prana = await Prana.deploy();
  await prana.deployed();
  console.log("Prana deployed to:", prana.address);

  const PranaHelper = await ethers.getContractFactory("pranaHelper");
  const pranaHelper = await PranaHelper.deploy(prana.address);
  await pranaHelper.deployed();
  console.log("pranaHelper deployed to:", pranaHelper.address);

  let config = `
  export const pranaAddress = "${prana.address}"
  export const pranaHelperAddress = "${pranaHelper.address}"
  `;

  let data = JSON.stringify(config);
  fs.writeFileSync("config.js", JSON.parse(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
