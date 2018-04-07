const Web3 = require('web3');

const printTx = ({ hash, gas, gasPrice }) => console.log(`
Tx hash: ${hash}
Tx gas: ${gas}
Tx gasPrice: ${gasPrice}
`);

const printBlock = ({ number, hash, transactions, parentHash, timestamp }, { printTransactions } = {}) => {
  console.log(`
Block number: ${number}
Block hash: ${hash}
Parent Hash: ${parentHash}
Block date: ${new Date(timestamp * 1000)}
Number of transactions: ${transactions ? transactions.length : 0}`
  );

  if (printTransactions) {
    console.log(`________________`);
    printTransactions(transactions);
  }
};

async function run() {
  const web3 = new Web3('http://localhost:8545');
  const latestBlock = await web3.eth.getBlock('latest');
  const blocks = [latestBlock];

  for (let i = latestBlock.number; i > (latestBlock.number - 4); i--) {
    const block = await web3.eth.getBlock(i);
    blocks.push(block);
  }

  const blockWithTxs = await web3.eth.getBlock(3707);
  blocks.push(blockWithTxs);

  blocks.forEach((block, idx) => printBlock(block, idx === blocks.length - 1 ? {
    printTransactions: async (transactions) => {
      for (let hash of transactions) {
        const tx = await web3.eth.getTransaction(hash);
        printTx(tx);
      }
    }
  } : {}));
}

run();
