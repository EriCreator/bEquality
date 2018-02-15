$(window).on('load', function() {
    
    var contractAddress = "0x3150f31a3e352cf314e5a04f33b61dfe8d9a6cad"; // in Ropsten testnet!
    var contractAbi = [
	{
		"constant": true,
		"inputs": [],
		"name": "getGreeting",
		"outputs": [
			{
				"name": "s",
				"type": "string"
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
				"name": "s",
				"type": "string"
			}
		],
		"name": "setGreeting",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
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
    var contractInstance = web3.eth.contract(contractAbi).at(contractAddress);
    contractInstance.getGreeting(function(error, greeting) {
        if (error) {
            var errorMsg = 'error reading greeting from smart contract: ' + error;
            $('#content').text(errorMsg);
            console.log(errorMsg);
            return;
        }
        $('#content').text('Current message: ' + greeting);
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
