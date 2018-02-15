pragma solidity ^0.4.17;

/*
   a simple introduction smart contract
   with an example of how to set and get values in Solidity
*/

contract SurveyFactory {

  address[] public SurveyContracts;

  // useful to know the row count in contracts index

  function getContractCount() public constant returns(uint contractCount) {
    return SurveyContracts.length;
  }

  // deploy a new contract

  function createNewSurvey(address[] addressessOfEmployees, string _hashToaddressessOfEmployees) public returns(address newContract) {
    Survey c = new Survey(addressessOfEmployees, _hashToaddressessOfEmployees);
    SurveyContracts.push(c);
    return c;
  }
}

contract Survey {
    mapping (address => string) public hashes;
    mapping (address => bool) public isAllowedToSumbitSurvey;
    string hashToaddressessOfEmployees;

    function Survey(address[] addressessOfEmployees, string _hashToaddressessOfEmployees) public {
        hashToaddressessOfEmployees = _hashToaddressessOfEmployees;
        for (uint256 index = 0; index < addressessOfEmployees.length; index++) {
            isAllowedToSumbitSurvey[addressessOfEmployees[index]] = true;
        }
    }

    function submitResults(string myHash) public {
        require(bytes(hashes[msg.sender]).length == 0);
        require(isAllowedToSumbitSurvey[msg.sender]);
        hashes[msg.sender] = myHash;
    }

    
}
