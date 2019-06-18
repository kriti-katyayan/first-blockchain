//A SIMPLE DEMONSTRATION OF HOW A BLOCKCHAIN WORKS


const SHA256=require('crypto-js/sha256');

class block {
    constructor(index,timestamp,data,previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash='';
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class blockChain{
    constructor(){
        this.chain=[ this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new block(0,"01/01/2019","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]; 
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash =newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for( let i = 1 ; i <this.chain.length ; i++){
           const  currentBlock = this.chain[i];
           const previousBlock = this.chain[i-1];

           if(currentBlock.hash !== currentBlock.calculateHash()){
            return false;
           }

           if(currentBlock.previousHash !== previousBlock.hash){
               return false
           }
        }
        return true;
    }
}


let kCoin = new blockChain()
kCoin.addBlock(new block(1,"10/1/19",{ amount : 4}));
kCoin.addBlock(new block(2,"12/1/19",{ amount : 40}));

console.log('Is blockchain valid?' + kCoin.isChainValid())

kCoin.chain[1].data = { amount: 100 };
kCoin.chain[1].hash=kCoin.chain[1].calculateHash()
console.log('Is blockchain valid?' + kCoin.isChainValid())
//console.log(JSON.stringify(kCoin,null,4))