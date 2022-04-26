const store = require('./store');
const storeUser = require('../user/store');

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

const validate = (code, wallet) => {
    return new Promise( async (resolve, reject) => {
        try {

            const userValidateTicket = await storeUser.get(wallet);
            if(userValidateTicket.ticket <= 0) throw 'No ticket';

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
            let aux;
            array.map( async (value, index) => {
                indice = Object.keys(indexPosition[index])[0];
                if(code == value) {
                    result = true;
                    if( indice == 'a'){
                        aux = 'a';
                        decremento = data[0].aa - 1;
                        index = indexPosition[index].a;

                        //check amount
                        if(decremento <= 0) generateRandom(aux, array);

                    }
                 
                    if(indice == 'b'){
                        aux = 'b';
                        decremento = data[0].bb - 1;
                        index = indexPosition[index].b;

                        //check amount
                        if(decremento <= 0) generateRandom(aux, array);

                    }

                    if(indice == 'c'){
                        aux = 'c';
                        decremento = data[0].cc - 1;
                        index = indexPosition[index].c;

                        //check amount
                        if(decremento <= 0) generateRandom(aux, array);

                    }

                    if(indice == 'd'){
                        aux = 'd';
                        decremento = data[0].dd - 1;
                        index = indexPosition[index].d;

                        //check amount
                        if(decremento <= 0) generateRandom(aux, array);

                    }
                    
                    newData.amount = decremento;
                    newData.index = index;
                    await decrement(newData);

                }
            })
    
            resolve({
                result,
                key: aux
            });
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });
}

const decrement = (data) => {
    return store.decrement(data);
}

let random = () => parseInt(Math.random() * (401 - 1) + 1);

const generateRandom = async (code, array) => {

   let randomData = random();
    
   //si existe el ramdom en el array volvemos a ejecutar
    if(array.includes(randomData)){
        generateRandom = (code, array);
    }

    await store.updateRandom(randomData, code);

}

const verify = (wallet) => {
    return new Promise( async (resolve, reject) => {
        try {

            //validate ticket
            const userValidateTicket = await storeUser.get(wallet);
            if(userValidateTicket.ticket == 0) throw 'No ticket';

            await store.verify(wallet.toLowerCase());
            resolve('Add Pass');
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });
}

module.exports = {
    validate,
    verify
}