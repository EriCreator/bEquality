$(window).on('load', function() {

    // var contractAddress = "0x3150f31a3e352cf314e5a04f33b61dfe8d9a6cad"; // in Ropsten testnet!
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
    
    // create instance of contract object that we use to interface the smart contract

    var factoryInstance = web3.eth.contract(factoryAbi).at(factoryAddress);
    factoryInstance.getContractAddress.call(0,function(error) {
        if (error) {
            console.log("Factory instantiation failed");
        } else {
            console.log("Factory instantiation succeeded");
        }
        $('#content').text('You are communication with the contract factory at address: ' + factoryAddress);
    });

    
    
    $('#my-form').on('submit', function(e) {
        e.preventDefault(); // cancel the actual submit
        var newGreeting = $('#greeting').val(); 
        contractInstance.setGreeting(newGreeting, function(error, txHash) {
            if (error) {
                var errorMsg = 'error writing new message to smart contract: ' + error;
                $('#content').text(errorMsg);
                console.log(errorMsg);
                return;
            }
            $('#content').text('submitted new message to blockchain, transaction hash: ' + txHash);
        });
    });
    
    $("#enter_IPFS_button").on('click', function(){
        var newHash = $('#input_IPFS_hash').val(); 
        $('#test_area').text('The new hash is: ' + newHash);
        $('#input_IPFS_hash').val(""); 
    });

});

function cb(error, response) {
    // callback as helper function for debugging purposes
    console.log('error: ' + error + ', response: ' + response);
}
