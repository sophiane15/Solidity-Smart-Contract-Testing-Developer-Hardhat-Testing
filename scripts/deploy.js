const { ethers } = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  console.log("Deploying Mytest contract...");
  console.log("Unlock time:", unlockTime);
  console.log("Locked amount:", ethers.formatEther(lockedAmount), "ETH");

  // Deploy the smart contract using Hardhat 2 syntax
  const Mytest = await ethers.getContractFactory("Mytest");
  const mytest = await Mytest.deploy(unlockTime, { value: lockedAmount });

  await mytest.waitForDeployment();

  const contractAddress = await mytest.getAddress();
  
  console.log(`✅ Contract deployed to: ${contractAddress}`);
  console.log(`   Unlock time: ${unlockTime}`);
  console.log(`   Locked amount: ${ethers.formatEther(lockedAmount)} ETH`);
}

main().catch((error) => { 
  console.error(error);
  process.exitCode = 1;
});