
const hre = require("hardhat");
const fs = require('fs');
async function main() {
  const BookMarkFactory = await hre.ethers.getContractFactory("BookMark");
  const BookMark = await BookMarkFactory.deploy();
  
  await BookMark.deployed();
  const contractsDir = __dirname + "/../contractsData";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  fs.writeFileSync(
    contractsDir + `/bookmark-address.json`,
    JSON.stringify({ address: BookMark.address }, undefined, 2)
  );
  const contractArtifact = hre.artifacts.readArtifactSync("BookMark")
  fs.writeFileSync(
    contractsDir + `/bookmark.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
  console.log("BookMark deployed to:", BookMark.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
