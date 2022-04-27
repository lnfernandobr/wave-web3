async function main() {
  const contractName = "WavePortal";
  const waveContractFactory = await hre.ethers.getContractFactory(contractName);
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );

  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let totalWave = await waveContract.getTotalWaves();
  console.log(`Total waves befere we waved: ${totalWave}`);

  let waveTranscation = await waveContract.wave("i love you baby");

  waveTranscation.wait(); // mining

  const [_, randomPerson] = await hre.ethers.getSigners();

  waveTranscation = await waveContract
    .connect(randomPerson)
    .wave("Another message!");

  waveTranscation.wait(); // mining

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  const allWaves = await waveContract.getAllWaves();
  console.log("allWaves: ", allWaves);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);
  }
})();
