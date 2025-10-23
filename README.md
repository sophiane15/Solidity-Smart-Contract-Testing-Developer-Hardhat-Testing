# Smart Contract Testing with Hardhat 2

This project demonstrates how to test a Solidity smart contract using Hardhat 2 with Ethers.js. It includes a time-locked contract with comprehensive tests.

## 📋 Project Overview

This project contains:

- **Solidity Contract**: `Mytest.sol` - A time-locked contract
- **Deployment Scripts**: `deploy.js` - Contract deployment
- **Comprehensive Tests**: `test.js` - Test suite with Mocha and Chai
- **Hardhat 2 Configuration**: Optimized configuration for development

## 🏗️ Contract Architecture

### Contract `Mytest.sol`
```solidity
contract Mytest {
    uint public unlockTime;
    address payable public owner;
    
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
```

**Features:**
- 🔒 ETH locked until a specific date
- 👤 Single contract owner
- ⏰ Time verification for withdrawals
- 📢 Event emission during withdrawals

## 🧪 Test Suite

### Deployment Tests
- ✅ Unlock time verification
- ✅ Owner verification
- ✅ Contract balance verification
- ✅ Deployment condition validation

### Withdrawal Tests
- ✅ Rejection if called too early
- ✅ Rejection if called by non-owner
- ✅ Success if called by owner at the right time

### Event Tests
- ✅ `Withdrawal` event emission

### Transfer Tests
- ✅ Balance change verification

## 🚀 Installation and Usage

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
```bash
# Clone the project
git clone <repo-url>
cd solidity-smart-contract-testing-developer-hardhat-testing

# Install dependencies
npm install
```

### Available Commands

#### Compilation
```bash
npx hardhat compile
```

#### Testing
```bash
# Run all tests
npx hardhat test

# Run tests with more details
npx hardhat test --verbose
```

#### Deployment
```bash
# Local deployment
npx hardhat run scripts/deploy.js

# Deploy to specific network
npx hardhat run scripts/deploy.js --network <network-name>
```

## 📊 Test Results

```
Lock
  Deployment
    ✔ Should check unlocked time (360ms)
    ✔ Should set the right owner
    ✔ Should check if the contract has the correct balance
    ✔ Should fail if the unlocked is not in the future
  Withdrawls
    Validations
      ✔ Should revert with the right error if called too soon
      ✔ Should revert the message for right owner
      ✔ Should not fail the unlockTime has arrived and the owner calls it
    EVENTS
      ✔ Should emit the event on withdrawls
    Transfert
      ✔ Should transfert the funds to the owner

8 passing (390ms)
```

## 🔧 Technologies Used

- **Hardhat 2.26.3** - Ethereum development framework
- **Ethers.js** - Library for Ethereum interactions
- **Mocha** - Testing framework
- **Chai** - Assertion library
- **Solidity 0.8.20** - Smart contract programming language

## 📁 Project Structure

```
├── contracts/
│   └── Mytest.sol          # Main contract
├── scripts/
│   └── deploy.js           # Deployment script
├── test/
│   └── test.js             # Test suite
├── hardhat.config.js       # Hardhat configuration
├── package.json            # Project dependencies
└── README.md              # Documentation
```

## 🛡️ Security and Best Practices

- ✅ User input validation
- ✅ Error handling with explicit messages
- ✅ Permission verification
- ✅ Comprehensive regression tests
- ✅ Use of `loadFixture` for test isolation

## 🎯 Key Features Tested

1. **Secure Deployment**: Verification that the contract cannot be deployed with a past date
2. **Owner Management**: Only the owner can withdraw funds
3. **Time Control**: Funds can only be withdrawn after the unlock date
4. **Event Emission**: Withdrawal traceability
5. **Transfer Management**: Balance change verification

## 📈 Future Improvements

- [ ] Web user interface
- [ ] Performance testing
- [ ] Price oracle integration
- [ ] Multiple ERC-20 token support
- [ ] Automatic renewal mechanism

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 📞 Support

For any questions or issues, feel free to open an issue on GitHub.

---

**Developed with ❤️ using Hardhat 2 and smart contract development best practices.**