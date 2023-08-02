const block = require('./block');
const cryptohash = require('./crypto_hash');
class Blockchain {
    constructor(){
        this.chain=[block.genesis()];
    }
    addBlock({data}){
        const newBlock = block.mineblock({
            prevBlock: this.chain[this.chain.length-1],
            data,
        });
        this.chain.push(newBlock);
    }
    replaceChain(chain){
        if (chain<=this.chain.length){
            console.log("the incoming chain is not longer");
            return;
        }
        if(!Blockchain.isValidChain(chain)){
        console.log("the incomin chain is not valid");
        return;
        }

        this.chain=chain;
    }

    static isValidChain(chain){
        if (JSON.stringify(chain[0]) !==JSON.stringify(block.genesis()))
        {
            return false;
        }
        for (let i =1 ; i < chain.length; i++){
            const { timestamp , prevhash ,hash , data , nonce , difficulty} = chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const reallasthash = chain[i-1].hash;

            if(prevhash != reallasthash) return false;
            const validatehash = cryptohash(timestamp ,prevhash,data ,nonce, difficulty);
            if(hash !== validatehash) return false;
            if(Math.abs(lastDifficulty-difficulty)>1) return false;
        }
        return true;    
    }
}
const blockchain = new Blockchain();
//blockchain.addBlock({data:"block1"});
//blockchain.addBlock({data:"block2"});
 const result = Blockchain.isValidChain(blockchain.chain);
console.log(blockchain.chain)
//console.log(result);
//console.log(blockchain);
module.exports = Blockchain;