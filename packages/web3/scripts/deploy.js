const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const contractName = "WavePortal";
  const waveContractFactory = await hre.ethers.getContractFactory(contractName);
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });

  await waveContract.deployed();
  console.log("WavePortal address: ", waveContract.address);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);
  }
})();
