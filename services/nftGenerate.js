let types = {
    common: { min: 40, max: 90, top: 200, url: "url del common", name: "Name NFT Common" },
    rare: { min: 60, max: 100, top: 230, url: "url del rare", name: "Name NFT rare" },
    epic: { min: 80, max: 100, top: 260, url: "url del epic", name: "Name NFT epic" },
    legendary: { min: 90, max: 110, top: 300, url: "url del lengedary", name: "Name NFT lengedary" }
};

let random = (min, max) => parseInt(Math.random() * (max - min) + min);

const typeGenerateCommon = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 5000) return "legendary"; // 0.5%
    if (numRandom > 1000 && numRandom <= 15000) return "epic"; // 1.5%
    if (numRandom > 9000 && numRandom <= 300000) return "rare"; // 30%
    if (numRandom > 300000 && numRandom <= 1000000) return "common"; // 60%
};

const typeGenerateEpic = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 30000) return "legendary"; // 3%
    if (numRandom > 30000 && numRandom <= 170000) return "epic"; // 17%
    if (numRandom > 170000 && numRandom <= 600000) return "rare"; // 60%
    if (numRandom > 600000 && numRandom <= 1000000) return "common"; // 30%
};

const typeGenerateLegendary = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 60000) return "legendary"; // 6%
    if (numRandom > 60000 && numRandom <= 300000) return "epic"; // 30%
    if (numRandom > 300000 && numRandom <= 600000) return "rare"; // 60%
    if (numRandom > 600000 && numRandom <= 1000000) return "common"; // 20%
};

const typePackage = {
    0: () => typeGenerateCommon(random(1, 1000000)),   //common
    1: () => typeGenerateEpic(random(1, 1000000)),     //epic
    2: () => typeGenerateLegendary(random(1, 1000000)) //legendary
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
        packageId: Number(id), //0: common, 1: epic, 2: legendary
        wallet
    };
};

const mint = (id, wallet) => {
    const type = typePackage[id]();
    return nftGenerate(type, id, wallet);   
}

module.exports = mint;