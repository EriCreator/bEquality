pragma solidity ^0.4.17;

/*
   SurveyFactory serves as a hub (deployed on the blockchain upon the launching of bEquality)
   Company can create their own survey by providing a list of permitted user address.
*/

contract SurveyFactory {

  //address owner;
  mapping(uint => address) public SurveyContracts;

  // function SurveyFactory(address adr) public {
  //    owner = adr;
  //}

  function createNewSurvey(uint companyID, address[] addressessOfEmployees, string _hashToaddressessOfEmployees) public returns(address newContract) {
    // require(msg.sender == owner);
    require(SurveyContracts[companyID] == 0x0);
    Survey c = new Survey(addressessOfEmployees, _hashToaddressessOfEmployees);
    SurveyContracts[companyID] = c;
    return c;
  }
  
  function getContractAddress(uint companyID) public constant returns (address) {
    return SurveyContracts[companyID];
  }
}

/*
   Survey is the child contract created by the SurveyFactory where only the permitted user can modify.
*/

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
