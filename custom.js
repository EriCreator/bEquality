$(window).on('load', function() {
    
    var contractAddress = "0x915b5929f44b97bd99b5166f3747a07ff6e5b168"; // in Ropsten testnet!
    var contractAbi = [
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
            "inputs": [],
            "name": "hashToaddressessOfEmployees",
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
    ]

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
    var contractInstance = web3.eth.contract(contractAbi).at(contractAddress);
    // contractInstance.getGreeting(function(error, greeting) {
    //     if (error) {
    //         var errorMsg = 'error reading greeting from smart contract: ' + error;
    //         $('#content').text(errorMsg);
    //         console.log(errorMsg);
    //         return;
    //     }
    //     $('#content').text('Current message: ' + greeting);
    // });
    
    
    // $('#my-form').on('submit', function(e) {
    //     e.preventDefault(); // cancel the actual submit
    //     var newGreeting = $('#greeting').val(); 
    //     contractInstance.setGreeting(newGreeting, function(error, txHash) {
    //         if (error) {
    //             var errorMsg = 'error writing new message to smart contract: ' + error;
    //             $('#content').text(errorMsg);
    //             console.log(errorMsg);
    //             return;
    //         }
    //         $('#content').text('submitted new message to blockchain, transaction hash: ' + txHash);
    //     });
    // });
    
    $("#enter_IPFS_button").on('click', function(){
        var newHash = $('#input_IPFS_hash').val(); 
       $('#input_IPFS_hash').val(""); 

        // submit hash to the smart contract
        contractInstance.submitResults(newHash, function(error, txHash) {
            if (error) {
                var errorMsg = 'error writing new message to smart contract: ' + error;
               console.log(errorMsg);
                return;
            }
            //$('#content').text('submitted new message to blockchain, transaction hash: ' + txHash);
        });
    });

    $("#getHashForAddress").on('click', function(){
        var newAddr = $('#input_contract_address').val(); 
        $('#input_contract_address').val(""); 

        // var blabla = contractInstance.hashes(newAddr);
        // alert( "res is " + blabla);
        // submit hash to the smart contract
        contractInstance.hashes(newAddr, function(error, resultString) {
            if (error) {
                var errorMsg = 'error writing new message to smart contract: ' + error;
                console.log(errorMsg);
                return;
            }
            console.log("succesfull GET-REQUEST");
            alert(resultString);
            //$('#content').text('submitted new message to blockchain, transaction hash: ' + txHash);
           
        });

    });

});

function cb(error, response) {
    // callback as helper function for debugging purposes
    console.log('error: ' + error + ', response: ' + response);
}
