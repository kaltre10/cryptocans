let types = {
    1: { min: 40, max: 90, top: 200, url: "url del common", name: "Name NFT Common" }, //common
    2: { min: 60, max: 100, top: 230, url: "url del rare", name: "Name NFT rare" }, //rare
    3: { min: 80, max: 100, top: 260, url: "url del epic", name: "Name NFT epic" }, //epic
    4: { min: 90, max: 110, top: 300, url: "url del lengedary", name: "Name NFT lengedary" } //legendary
};

let random = (min, max) => parseInt(Math.random() * (max - min) + min);

const typeGenerateCommon = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 5000) return 4; // 0.5% legendary
    if (numRandom > 5000 && numRandom <= 20000) return 3; // 1.5% epic
    if (numRandom > 20000 && numRandom <= 400000) return 2; // 38% rare
    if (numRandom > 400000 && numRandom <= 1000000) return 1; // 60% common
};

const typeGenerateEpic = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 30000) return 4; // 3% legendary
    if (numRandom > 30000 && numRandom <= 200000) return 3; // 17% epic
    if (numRandom > 200000 && numRandom <= 700000) return 2; // 50% rare
    if (numRandom > 700000 && numRandom <= 1000000) return 1; // 30% common
};

const typeGenerateLegendary = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 100000) return 4; // 10% legendary
    if (numRandom > 100000 && numRandom <= 500000) return 3; // 40% epic
    if (numRandom > 500000 && numRandom <= 1000000) return 2; // 50% rare
    if (numRandom > 0 && numRandom <= 0) return 1; // 0% common
};

const typePackage = {
    1: () => typeGenerateCommon(random(1, 1000000)),   //common
    2: () => typeGenerateEpic(random(1, 1000000)),     //epic
    3: () => typeGenerateLegendary(random(1, 1000000)) //legendary 
}

const nftGenerate = (type, id, wallet) => {
    let aerodinamica = random(types[type].min, types[type].max);
    let aceleracion = random(types[type].min, types[type].max);
    let resistencia = types[type].top - (aerodinamica + aceleracion);
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

const mint = (id, wallet) => {
    if(!typePackage[id] || !wallet) throw "Error Inesperado";
    const type = typePackage[id]();
    return nftGenerate(type, id, wallet);   
}

module.exports = mint;