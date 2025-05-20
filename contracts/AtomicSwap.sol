// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AtomicSwap {
    address public sender;
    address public recipient;
    bytes32 public hashlock;
    uint256 public timelock;
    bool public isWithdrawn;
    bool public isRefunded;
    bytes32 public secret;

    constructor(address _recipient, bytes32 _hashlock, uint256 _timelock) payable {
        sender = msg.sender;
        recipient = _recipient;
        hashlock = _hashlock;
        timelock = block.timestamp + _timelock;
    }

    function withdraw(bytes32 _secret) public {
        require(msg.sender == recipient, "Not recipient");
        require(!isWithdrawn, "Already withdrawn");
        require(sha256(abi.encodePacked(_secret)) == hashlock, "Invalid secret");

        isWithdrawn = true;
        secret = _secret;
        payable(recipient).transfer(address(this).balance);
    }

    function refund() public {
        require(msg.sender == sender, "Not sender");
        require(!isWithdrawn, "Already withdrawn");
        require(block.timestamp >= timelock, "Timelock not expired");

        isRefunded = true;
        payable(sender).transfer(address(this).balance);
    }
}
