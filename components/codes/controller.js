const store = require('./store');

const get = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const data = await store.get();
            resolve(data);
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });
}

const indexPosition = [
    {a: "aa"},
    {b: "bb"},
    {c: "cc"},
    {d: "dd"}
]

const validate = (code) => {
    return new Promise( async (resolve, reject) => {
        try {
            const data = await store.get();

            const array = [
                data[0].a,
                data[0].b,
                data[0].c,
                data[0].d
            ];

            let result = false;
            const newData = {};
            let decremento;
            let index;
            let indice;
            array.map( async (value, index) => {
                indice = Object.keys(indexPosition[index])[0];
                if(code == value) {
                    result = true;
                    if( indice == 'a'){
                        decremento = data[0].aa - 1;
                        index = indexPosition[index].a;

                        //check amount
                        if(decremento == 0) generateRandom(index);

                    }
                 
                    if(indice == 'b'){
                        decremento = data[0].bb - 1;
                        index = indexPosition[index].b;

                        //check amount
                        if(decremento == 0) generateRandom(index);

                    }

                    if(indice == 'c'){
                        decremento = data[0].cc - 1;
                        index = indexPosition[index].c;

                        //check amount
                        if(decremento == 0) generateRandom(index);

                    }

                    if(indice == 'd'){
                        decremento = data[0].dd - 1;
                        index = indexPosition[index].d;

                        //check amount
                        if(decremento == 0) generateRandom(index);

                    }
                    
                    newData.amount = decremento;
                    newData.index = index;
                    await decrement(newData);

                }
            })
    
            resolve(result);
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });
}

const decrement = (data) => {
    return store.decrement(data);
}

const generateRandom = (code) => {
    console.log(code);
    
}

module.exports = {
    get,
    validate
}