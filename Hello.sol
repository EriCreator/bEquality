pragma solidity ^0.4.17;

/*
   a simple introduction smart contract
   with an example of how to set and get values in Solidity
*/

contract Hello {
    string testString;
    
    // setter function
    function setGreeting(string s) public {
        testString = s;
    }
    
    // getter function (wich returns s)
    function getGreeting() public view returns (string s) {
        s = testString;
    }
}
