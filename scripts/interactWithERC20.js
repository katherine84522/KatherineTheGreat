const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;

// Load the ABI from the JSON file
const CONTRACT_ABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../artifacts/contracts/MyERC20Token.sol/MyERC20Token.json'))).abi;

async function main() {
  // Connect to the Sepolia network
  const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY);

  // Create a wallet instance
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  // Create a contract instance
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

  // Interact with the contract
  const totalSupply = await contract.totalSupply();
  console.log("Total Supply:", totalSupply.toString());

  const balance = await contract.balanceOf(wallet.address);
  console.log("Balance:", balance.toString());

  // Transfer tokens (example: transfer 100 tokens to another address)
  const tx = await contract.transfer(RECIPIENT_ADDRESS, ethers.parseUnits("100", 18));
  await tx.wait();
  console.log("Transfer complete");

  let amountToMint = ethers.parseUnits("100", 18);
  const mint = await contract.mint(RECIPIENT_ADDRESS, amountToMint);
  await mint.wait();
  
  const balance1 = await contract.balanceOf(wallet.address);
  console.log("Balance:", balance1.toString());

  const totalSupply1 = await contract.totalSupply();
  console.log("Total Supply:", totalSupply1.toString());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
