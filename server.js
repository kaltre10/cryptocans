const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Server Active!!!'));

const port = process.env.PORT || 3000;

app.listen( port, () => {
    console.log(`server activo en el puerto ${port}`);
});