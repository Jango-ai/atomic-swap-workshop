const hre = require("hardhat");
const crypto = require("crypto");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const secret = "mySecret";
  const hashlock = "0x" + crypto.createHash("sha256").update(secret).digest("hex");

  const ethAmount = hre.ethers.parseEther("1.0");

  const AtomicSwap = await hre.ethers.getContractFactory("AtomicSwap");
  const swap = await AtomicSwap.deploy(
    deployer.address,
    hashlock,
    3600,
    { value: ethAmount }
  );

  // 👇 ya no hace falta await swap.deployed()
  console.log("✅ AtomicSwap deployed to:", await swap.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
