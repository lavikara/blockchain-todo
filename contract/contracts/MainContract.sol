// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract MainContract {
    address public owner;
    string public contractName;

    constructor() {
        owner = msg.sender;
        contractName = "LaviTodo";
    }
}