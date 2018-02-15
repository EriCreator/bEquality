$(window).on('load', function() {

    // var contractAddress  = "0x915b5929f44b97bd99b5166f3747a07ff6e5b168"; // in Ropsten testnet!
    var factoryAddress = "0x1c8ee6b443cdf7ac9675fb8e079c02b7ac1e55c7"; // in Ropsten testnet!

    var factoryAbi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "companyID",
                    "type": "uint256"
                }
            ],
            "name": "getContractAddress",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "SurveyContracts",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "companyID",
                    "type": "uint256"
                },
                {
                    "name": "addressessOfEmployees",
                    "type": "address[]"
                },
                {
                    "name": "_hashToaddressessOfEmployees",
                    "type": "string"
                }
            ],
            "name": "createNewSurvey",
            "outputs": [
                {
                    "name": "newContract",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    var surveyAbi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "hashes",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "isAllowedToSumbitSurvey",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "myHash",
                    "type": "string"
                }
            ],
            "name": "submitResults",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "addressessOfEmployees",
                    "type": "address[]"
                },
                {
                    "name": "_hashToaddressessOfEmployees",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
    ];

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        $('#content').text('I has web3!!!');
        window.web3 = new Web3(web3.currentProvider);
    } else {
        var errorMsg = 'I doesn\'t has web3 :( Please open in Google Chrome Browser and install the Metamask extension.';
        $('#content').text(errorMsg);
        console.log(errorMsg);
        return;
    }

    var factoryInstance = web3.eth.contract(factoryAbi).at(factoryAddress);
    factoryInstance.getContractAddress.call(0,function(error) {
        if (error) {
            console.log("Factory instantiation failed");
        } else {
            console.log("Factory instantiation succeeded");
        }
        $('#content').text('You are communication with the contract factory at address: ' + factoryAddress);
    });

    
    $('#contract_creation').on('submit', function(e) {
        e.preventDefault(); // cancel the actual submit

        var newCompanyID = parseInt($('#init_input_1').val(), 10); 
        var adrtemp = document.getElementById("init_input_2");
        var newAdrList = adrtemp.value.split("\n");
        var newIPFSAdr = $('#init_input_3').val(); 
        var newContract;

        newContract = factoryInstance.createNewSurvey(newCompanyID, newAdrList, newIPFSAdr, function(error, txHash) {
            if (error) {
                var errorMsg = 'error creating new survey (child) contract : ' + error;
                $('#event_logging').text(errorMsg);
                console.log(errorMsg);
                return;
            }
            // $('#event_logging').text('submitted new creation of the survey (child) contract to blockchain, transaction hash: ' + txHash + '\nThe survey of your company is at: ' + newContract);
            $('#event_logging').text('submitted new creation of the survey (child) contract to blockchain, transaction hash: ' + txHash);
      
        });

        // $('#event_logging').text('The survey of your company is at: ' + newContract);
        $('#event_logging').text('Transacting. . .');

    });

    $("#enter_Questions_button").on('click', function(){
        // var contractIndex = 1;
        var contractIndex = parseInt($('#input_company_id').val(), 10);
        factoryInstance.getContractAddress(contractIndex, function(error, contractAddress) {
            if (error) {
                console.log("No such contract found");
                return;
            } else {
                console.log("Contract found adress: " + contractAddress);
            }
            // var newAddr = $('#input_contract_address').val(); 
            // $('#input_contract_address').val(""); 
            var one = $("#selection1").val() * 100;
            var two = $("#selection2").val() * 10;
            var three = $("#selection3").val();
            var newHash = (parseInt(one) + parseInt(two) + parseInt(three)).toString();
            console.log('1: ' + one  + '  2: ' +  two + '  3: ' + three );
            // create instance of contract object that we use to interface the smart contract
            var contractInstance = web3.eth.contract(surveyAbi).at(contractAddress);

            // submit hash to the smart contract
            contractInstance.submitResults(newHash, function(error, txHash) {
                if (error) {
                    var errorMsg = 'error writing new message to smart contract: ' + error;
                    console.log(errorMsg);
                    return;
                } else {
                    console.log('hash stored: ' + newHash);
                    alert('answers are succesfully stored on the blockchain');
                }
                //$('#content').text('submitted new message to blockchain, transaction hash: ' + txHash);
            });
        });
    });

    $("#getHashForAddress").on('click', function(){
        // var newAddr = $('#input_contract_address').val(); 
        // $('#input_contract_address').val(""); 
        // var contractIndex = 1;
        var contractIndex = parseInt($('#input_company_id').val(), 10);
        factoryInstance.getContractAddress(contractIndex, function(error, contractAddress) {
            if (error) {
                console.log("No such contract found");
                return;
            } else {
                console.log("Contract found adress: " + contractAddress);
            }
            var newAddr = $('#input_contract_address').val(); 

            // create instance of contract object that we use to interface the smart contract
            var contractInstance = web3.eth.contract(surveyAbi).at(contractAddress);

            // get hash from the smart contract
            contractInstance.hashes(newAddr, function(error, resultString) {
                if (error) {
                    var errorMsg = 'error writing new message to smart contract: ' + error;
                    console.log(errorMsg);
                    return;
                }else {
                    console.log("succesfully retrieved hash: " + resultString);
                    alert("selections: " + resultString);
                }
            });
            $('#input_contract_address').val("");  
        });
    });
});

function cb(error, response) {
    // callback as helper function for debugging purposes
    console.log('error: ' + error + ', response: ' + response);
}
