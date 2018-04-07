const read = require('readline-sync');
const Web3 = require('web3');

async function run() {
  const web3 = new Web3('http://localhost:8545')

  const from = read.question('From: \n');
  const to = read.question('To: \n');
  const value = read.question('Value: \n');
  const gas = read.question('Gas: \n');
  const gasPrice = read.question('Gas Price: \n');


  try {
    const { transactionHash } = await web3.eth.sendTransaction({
      from, to, value
    });

    const { status, gasUsed } = await web3.eth.getTransactionReceipt(transactionHash);

    console.log(`Transaction sent with hash: ${transactionHash}
Reciept: ${JSON.stringify({ status, gasUsed }, null, 2)}
`);
  } catch (e) {
    console.error(`Error: ${e}`)
  }
}

run()
