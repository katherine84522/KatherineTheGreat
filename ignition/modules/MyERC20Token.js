const hre = require("hardhat");

async function main(){

    const [deployer] = await ethers.getSigners();

    // console.log("Deploying contract with account: ", deployer.address);
    // console.log("Account balance: ", (await deployer.getBalance()).toString());

    const KatherineTheGreat = await hre.ethers.getContractFactory("MyERC20Token");
    const token = await KatherineTheGreat.deploy(5000000000);

    await token.deployed();

    console.log("Token address: ", token.address);

    await hre.run("verify:verify", {
        address: token.address,
        constructorArguments: [5000000000]
    })
}

main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;
})