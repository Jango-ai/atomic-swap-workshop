const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const hashlock = hre.ethers.utils.sha256(hre.ethers.utils.toUtf8Bytes("mySecret"));

  const AtomicSwap = await hre.ethers.getContractFactory("AtomicSwap");
  const swap = await AtomicSwap.deploy(deployer.address, hashlock, 3600, { value: hre.ethers.utils.parseEther("1.0") });

  await swap.deployed();

  console.log("AtomicSwap deployed to:", swap.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
