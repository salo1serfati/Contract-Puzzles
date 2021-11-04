const { assert } = require("chai");
// const { ethers } = require("ethers");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();
    let wallet; 
    while(true) {
      wallet = ethers.Wallet.createRandom();
      if (BigInt(await wallet.getAddress()) < BigInt(0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf) ) {
        break;
      }
    }
    const address = await wallet.getAddress();  
    console.log("We found a proper wallet at: " + address);

    //Send eth to the wallet 
    const signer = ethers.provider.getSigner(0);
    //Connect this new wallet to providers
    wallet = wallet.connect(ethers.provider);

    const tx = {
      to: address,
      value: ethers.utils.parseEther("100.0")
    }

    // Sending ether
    await signer.sendTransaction(tx)

    //
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
