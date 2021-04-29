// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract UserContract {
    uint public userCount = 0;
    address public userAccount;

    struct User {
        uint id;
        address payable userAddress;
        string userName;
        bool active;
        bool isLoggedIn;
    }

    mapping(address => User) public users;

    constructor() {
        userCount ++;
        userAccount = msg.sender;
    }

    event Registered (
        uint id,
        address payable userAddress,
        string userName,
        bool active
    );

    function register(string memory _userName) public returns(bool) {
        userCount ++;
        users[msg.sender] = User(userCount, msg.sender, _userName, true, false);
        emit Registered(userCount, msg.sender, _userName, true);
        return true;
    }
}