pragma solidity ^0.4.17;

/*
   a simple introduction smart contract
   with an example of how to set and get values in Solidity
*/

contract Survey {
    mapping (address => string) public hashes;
    mapping (address => bool) public isAllowedToSumbitSurvey;

    function Survey(address[] addressessOfEmployees) public {
        for (var index = 0; index < addressessOfEmployees.length; index++) {
        for (uint index = 0; index < addressessOfEmployees.length; index++) {
            isAllowedToSumbitSurvey[addressessOfEmployees[index]] = true;
        }
    }

    function submitResults(string myHash) public {
        require(bytes(hashes[msg.sender]).length == 0);
        require(isAllowedToSumbitSurvey[msg.sender]);
        hashes[msg.sender] = myHash;
    }

    
}
