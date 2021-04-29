const MainContract = artifacts.require("../contracts/MainContract");
const UserContract = artifacts.require("../contracts/UserContract");
const TodoContract = artifacts.require("../contracts/TodoContract");

module.exports = function(deployer) {
  deployer.deploy(MainContract).then(function() {
    return deployer.deploy(UserContract, MainContract.address).then(function() {
      return deployer.deploy(TodoContract, UserContract.address);
    });
  });
};
