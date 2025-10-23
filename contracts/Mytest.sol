// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions




// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract Mytest {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
      require(block.timestamp < _unlockTime, "Unlock time is in the past");
         unlockTime = _unlockTime;
         owner = payable(msg.sender);
    }

function withdraw() public {
  require(block.timestamp >= unlockTime, "You can't withdraw yet");
  require(msg.sender == owner, "you aren't the owner");

  emit Withdrawal(address(this).balance, block.timestamp);
  owner.transfer(address(this).balance);
}
}