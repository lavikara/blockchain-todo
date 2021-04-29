// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./UserContract.sol";

contract TodoContract {
    address public loggedInUser;
    uint public todoCount = 0;
    UserContract public userContract;

    struct Todo {
        address payable sender;
        uint id;
        string todo;
        bool completed;
    }

    mapping(uint => Todo) public todos;

    constructor(UserContract _userContractAddress) {
        userContract = _userContractAddress;
        createTodo("Welcome please take a quick tour of your todo app");
    }

    event TodoCreated (     
        uint id,
        string todo,
        bool completed
    );

    event TaskCompleted (     
        uint id,
        bool completed
    );

    modifier onlyLoggedIn {
        require (msg.sender == loggedInUser, "Please login to call this method");
        _;
    }

    function createTodo(string memory _todo) public onlyLoggedIn returns(bool) {
        todoCount ++;
        todos[todoCount] = Todo(msg.sender, todoCount, _todo, false);
        emit TodoCreated(todoCount, _todo, false);
        return true;
    }

    function toggleCompleted(uint _id) public onlyLoggedIn returns(bool) {
        Todo memory _todo = todos[_id];
        _todo.completed = !_todo.completed;
        todos[_id] = _todo;
        emit TaskCompleted(_id, _todo.completed );
        return true;
    }
}
