//	time : Manipulation du temps virtuel dans Hardhat (pour simuler le passage d'une année, etc.)
//  loadFixture : Optimiseur d'états, chaque test repart du même snapshot rapide
//  anyValue : Placeholder pour matcher n'importe quelle valeur dans les événements
//  expect : Assertions (vérifications) du framework de test Chai
//  Chai est utilisé avec des extensions Hardhat pour tester les smart contracts : 1. Vérifier des Valeurs 2. Vérifier des Erreurs (Revert) 3. Vérifier des Événements 4. Vérifier des Changements de Solde

const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function(){

  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECOND = 365 * 24 * 60 * 60;
    const ONE_GEWEI = 1_000_000_000;

    const lockedAmount = ONE_GEWEI;
    const unlockedTime = (await time.latest()) + ONE_YEAR_IN_SECOND;

    const [owner, otherAccount] = await ethers.getSigners();

    // Use "Mytest" which is the actual contract name
    const Mytest = await ethers.getContractFactory("Mytest");
    const mytest = await Mytest.deploy(unlockedTime, { value: lockedAmount });

    return { mytest, unlockedTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should check unlocked time", async function () {
      const { mytest, unlockedTime } = await loadFixture(deployOneYearLockFixture);
      //console.log(unlockedTime);
      //console.log(mytest);
      expect(await mytest.unlockTime()).to.equal(unlockedTime);
      //console.log(ab);
    });

    //CHECKING OWNER
    it("Should set the right owner", async function(){
      const { mytest, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await mytest.owner()).to.equal(owner.address)
    });

    //CHECKING BALANCE
    it("Should check if the contract has the correct balance", async function(){
      const { mytest, lockedAmount} = await loadFixture(deployOneYearLockFixture);
      expect(await ethers.provider.getBalance(await mytest.getAddress())).to.equal(lockedAmount);
    });

    //CHECK CONDITION
   it ("Should fail if the unlocked is not in the future", async function () {
      const latestTime = await time.latest();
      const Mytest = await ethers.getContractFactory("Mytest");

      await expect(Mytest.deploy(latestTime, { value: 1 })).to.be.revertedWith("Unlock time is in the past");
   })   

  });

  describe("Withdrawls", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { mytest } = await loadFixture(deployOneYearLockFixture);
        await expect(mytest.withdraw()).to.be.revertedWith("You can't withdraw yet");
      });

    it("Should revert the message for right owner", async function () {
      const { mytest, unlockedTime, otherAccount } = await loadFixture(deployOneYearLockFixture);
    });

      it("Should not fail the unlockTime has arrived and the owner calls it", async function (){
       const{mytest, unlockedTime} = await loadFixture(deployOneYearLockFixture);
       await time.increaseTo(unlockedTime);
       await expect(mytest.withdraw()).not.to.be.reverted;
     });
    });

     //CHECK EVENTS
     describe("EVENTS", function () {

     //submit events
     it("Should emit the event on withdrawls", async function (){
      const { mytest, unlockedTime, lockedAmount} = await loadFixture(deployOneYearLockFixture);

     await time.increaseTo(unlockedTime);
     await expect(mytest.withdraw())
          .to.emit(mytest, "Withdrawal")
          .withArgs(lockedAmount,anyValue);
        });

     });
   });

   //CHECK TRANSFERT
   describe("Transfert", function () {
    it ("Should transfert the funds to the owner", async function (){
      const { mytest, unlockedTime, lockedAmount, owner } = await loadFixture(deployOneYearLockFixture);

      await time.increaseTo(unlockedTime);
      await expect(mytest.withdraw()).to.changeEtherBalances(
        [owner, mytest], 
        [lockedAmount, -lockedAmount]
      );
    });



   });
 });