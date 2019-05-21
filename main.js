const SHA256 = require('crypto-js/sha256')
class Block {
  constructor(index, timeStamp, data, previousHash = '') {
    this.index = index
    this.timeStamp = timeStamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timeStamp +
        JSON.stringify(this.data)
    ).toString()
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGensisBlock()]
  }
  createGensisBlock() {
    return new Block(0, '01/04/2019', 'Hello Blockchain', '0')
  }
  getLatesBlock() {
    return this.chain[this.chain.length - 1]
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatesBlock().hash
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }
}

let GoldCoin = new Blockchain()
GoldCoin.addBlock(new Block(1, '12/04/2019', { amount: 4 }))
console.log(JSON.stringify(GoldCoin, null, 4))

