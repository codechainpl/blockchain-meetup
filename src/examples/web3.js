const Web3 = require('web3')

async function run () {
  const web3 = new Web3('http://localhost:8545')
  const block = await web3.eth.getBlock('latest');
  
  console.log(block)
  
  const { number, hash, transactions, timestamp } = block
  console.log(`
  Block number: ${number}
  Block hash: ${hash}
  Block date: ${new Date(timestamp * 1000)}
  Number of transactions: ${transactions.length}
  `)
}

run()
