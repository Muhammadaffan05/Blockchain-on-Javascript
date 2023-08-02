const hexToBinary = require("hex-to-binary");
const {Genesis_Data, MINE_RATE}= require ('./config');
const cryptohash= require('./crypto_hash');
class block{
    constructor({timestamp, prevhash ,hash, data , nonce, difficulty}){
        this.timestamp= timestamp;
        this.prevhash= prevhash;
        this.data=data;
        this.hash=hash;
        this.nonce=nonce;
        this.difficulty=difficulty;
    }
    static genesis(){
        return new this(Genesis_Data);
    }
    static mineblock({prevBlock,data}){
        let hash , timestamp ;
        const prevhash = prevBlock.hash;
        let{difficulty} = prevBlock;
        let nonce = 0;
        do{
            nonce ++ ;
            timestamp = Date.now();
            difficulty = block.adjust_difficulty({
                originalblock:prevBlock,
                timestamp,
            });
            hash=cryptohash(timestamp,prevhash,data,nonce,difficulty);
        } while(
            hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty)
            );
        return new this ({
            timestamp,  
            prevhash,
            data,
            difficulty,
            nonce,
            hash,
        });
    }
    static adjust_difficulty(originalblock, timestamp){
        const{difficulty}=originalblock;
        if(difficulty<1) return 1;
        const difference = timestamp - originalblock.timestamp;
        if(difference > MINE_RATE) return difficulty-1;
        return difficulty+1;

    } 

}
const block1 = new block({
    timestamp:'2/9/2002',
    prevhash:'0xscb',
    hash:'oxc34',
    data:'hello'});
//console.log(block1)
// const genesisblock = block.genesis();
// console.log(genesisblock);

// const result = block.mineblock({prevBlock:block1,data:"block2"});
// console.log(result);
module.exports = block;