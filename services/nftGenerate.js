/**
 * @fileoverview nftGenerate, funciones para generar el nft
 * @version 1
 * @author Jason Hernandez <kaltre10@gmail.com>
 * @copyright cryptocans.io
 * ----
 */

/**
 * Objeto del tipo de nft con los valores 
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
    if (numRandom >= 1 && numRandom <= 1000) return 4; // 0.1% legendary
    if (numRandom > 1000 && numRandom <= 50000) return 3; // 4.9% epic
    if (numRandom > 50000 && numRandom <= 350000) return 2; // 30% rare
    if (numRandom > 350000 && numRandom <= 1000000) return 1; // 65% common
};

/**
 * generador del nft epic
 * @param {number} numRandom
 * @return {number}  
 */
const typeGenerateEpic = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 10000) return 4; // 1% legendary
    if (numRandom > 10000 && numRandom <= 200000) return 3; // 19% epic
    if (numRandom > 200000 && numRandom <= 600000) return 2; // 40% rare
    if (numRandom > 600000 && numRandom <= 1000000) return 1; // 40% common
};

/**
 * generador del nft legendary
 * @param {number} numRandom
 * @return {number}  
 */
const typeGenerateLegendary = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 50000) return 4; // 5% legendary
    if (numRandom > 50000 && numRandom <= 400000) return 3; // 35% epic
    if (numRandom > 400000 && numRandom <= 1000000) return 2; // 60% rare
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
        name: generateName(), 
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

/**
 * array para generar el nombre de los canes 53 nombres 52 posiciones
 */
 const canName = [
    "Rex",
    "Strike",
    "Ciborg",
    "Predator",
    "Cyriak",
    "Tentacul",
    "Harmony",
    "Lumux",
    "Faiser",
    "Lumus",
    "Houmus",
    "Soad",
    "Jack",
    "Persival",
    "Icen",
    "Cooler",
    "Rocky",
    "Vi",
    "Astro",
    "Conrat",
    "Saico",
    "Psicox",
    "Red",
    "Fenix",
    "Sky",
    "Chace",
    "Patriot",
    "Thanos",
    "Rumiac",
    "Stripes",
    "Laikan",
    "Speed",
    "Machina",
    "RedSun",
    "Nova",
    "Storm",
    "Hachi",
    "Rainbow",
    "Sector",
    "Smith",
    "Bowser",
    "Lacerr",
    "Icarus",
    "Ripsaw",
    "Shadow",
    "Spot",
    "King",
    "3-k40",
    "C-3p0",
    "Ig-3k",
    "Green-420",
    "X-AE-A12",
    "Xavier"
];

/**
 * @return {string}   
 */
const generateName = () => {
    const number = random(0, 52);
    const code = random(100, 999);
    const name = `${canName[number]}-${code}`;
    return name;
}


module.exports = { 
    mint,
    random
};