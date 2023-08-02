const MINE_RATE = 1000 ;
const INITIAL_DIFFICULTY =2 ;
const Genesis_Data={
    timestamp:1,
    prevhash:'0x000',
    hash:'0x001',
    difficulty: INITIAL_DIFFICULTY,
    nonce:0,
    data:[],
}
module.exports = {Genesis_Data,MINE_RATE};