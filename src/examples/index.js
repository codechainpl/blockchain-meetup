const fetch = require('isomorphic-fetch')

async function run() {
  const res = await fetch('http://localhost:8545/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBlockByNumber',
      params: ['latest', false]
    })
  })

  const json = await res.json()

  console.log(json.result)

  const { number, hash, transactions, timestamp } = json.result

  const time = parseInt(timestamp.substr(2), 16)

  console.log(`
Block number: ${number}
Block hash: ${hash}
Block date: ${new Date(time * 1000)}
Number of transactions: ${transactions.length}
`)
}


run();
