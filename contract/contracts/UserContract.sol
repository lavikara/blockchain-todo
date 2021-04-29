// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./MainContract.sol";

contract UserContract {
    uint public userCount = 0;
    MainContract public mainContract;

    struct User {
        uint id;
        address userAddress;
        string userName;
        bool active;
        bool isLoggedIn;
    }

    mapping(address => User) public users;

    constructor(MainContract _mainContract) {
        mainContract = _mainContract;
        register("temi");
    }

    event Registered (
        uint id,
        address userAddress,
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