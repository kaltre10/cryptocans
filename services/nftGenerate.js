/**
 * @fileoverview nftGenerate, funciones para generar el nft
 * @version 1
 * @author Jason Hernandez <kaltre10@gmail.com>
 * @copyright cryptocans.io
 * ----
 */

/**
 * Array del tipo de nft con los valores 
 *  para sus propiedades 
 */
let types = {
    1: { min: 60, max: 80, maxMin: 200, maxTop: 229, url: "url del common", name: "Name NFT Common" }, //common
    2: { min: 70, max: 90, maxMin: 230, maxTop: 259, url: "url del rare", name: "Name NFT rare" }, //rare
    3: { min: 90, max: 110, maxMin: 260, maxTop: 299, url: "url del epic", name: "Name NFT epic" }, //epic
    4: { min: 100, max: 120, maxMin: 300, maxTop: 350, url: "url del lengedary", name: "Name NFT lengedary" } //legendary
};

/**
 * generador de un numero random entre un min y max 
 * @param {number} min
 * @param {number} max
 * @return {number}  
 */
let random = (min, max) => parseInt(Math.random() * (max - min) + min);

/**
 * generador del nft common
 * @param {number} numRandom
 * @return {number}  
 */
const typeGenerateCommon = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 5000) return 4; // 0.5% legendary
    if (numRandom > 5000 && numRandom <= 20000) return 3; // 1.5% epic
    if (numRandom > 20000 && numRandom <= 400000) return 2; // 38% rare
    if (numRandom > 400000 && numRandom <= 1000000) return 1; // 60% common
};

/**
 * generador del nft epic
 * @param {number} numRandom
 * @return {number}  
 */
const typeGenerateEpic = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 30000) return 4; // 3% legendary
    if (numRandom > 30000 && numRandom <= 200000) return 3; // 17% epic
    if (numRandom > 200000 && numRandom <= 700000) return 2; // 50% rare
    if (numRandom > 700000 && numRandom <= 1000000) return 1; // 30% common
};

/**
 * generador del nft legendary
 * @param {number} numRandom
 * @return {number}  
 */
const typeGenerateLegendary = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 100000) return 4; // 10% legendary
    if (numRandom > 100000 && numRandom <= 500000) return 3; // 40% epic
    if (numRandom > 500000 && numRandom <= 1000000) return 2; // 50% rare
    if (numRandom > 0 && numRandom <= 0) return 1; // 0% common
};

/**
 * Array de los Paquetes de nft con valores de las 
 *  funciones para cada tipo de paquete 
 */
const typePackage = {
    1: () => typeGenerateCommon(random(1, 1000000)),   //common
    2: () => typeGenerateEpic(random(1, 1000000)),     //epic
    3: () => typeGenerateLegendary(random(1, 1000000)) //legendary 
}

/**
 * Generamos el nft con sus propiedades
 * @param  {number} type
 * @param  {number} id
 * @param  {string} wallet
 * @return  {object} 
 * @return  {string} name 
 * @return  {number} rarity 
 * @return  {string} imgUrl 
 * @return  {number} aerodinamica 
 * @return  {number} aceleracion 
 * @return  {number} resistencia
 * @return  {number} packageId
 * @return  {string} wallet
 */
const nftGenerate = (type, id, wallet) => {
    let aerodinamica = random(types[type].min, types[type].max);
    let aceleracion = random(types[type].min, types[type].max);

    //numero min y max que no pase los topes para generar la resistencia
    let randomMax =  types[type].maxTop - (aerodinamica + aceleracion);
    let randomMin =  types[type].maxMin - (aerodinamica + aceleracion);
    let resistencia = random(randomMin, randomMax);

    return { 
        name: types[type].name, 
        rarity: type,
        imgUrl: types[type].url,
        aerodinamica,
        aceleracion, 
        resistencia,
        packageId: Number(id), //1: common, 2: epic, 3: legendary
        wallet
    };
};


/**
 * Minteamos el nft de acuerdo al package
 *  y mantenemos la wallet del usuario
 * @param  {number} id
 * @param  {string} wallet
 * @return  {funtion} nftGenerate
 * @return  {number} type
 * @return  {number} id
 * @return  {string} wallet
 */
const mint = (id, wallet) => {
    if(!typePackage[id] || !wallet) throw "Error Inesperado";
    const type = typePackage[id]();
    return nftGenerate(type, id, wallet);   
}

module.exports = { 
    mint,
    random
};