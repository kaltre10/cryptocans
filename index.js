const express = require('express');
const path = require('path');
const routerApi = require('./network/routerApi');
const app = express();
app.use(express.json());

routerApi(app);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen( port, () => {
    console.log(`server activo en el puerto ${port}`);
});