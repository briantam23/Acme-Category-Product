const db = require('./db');
const { Product, Category } = db.models;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use('/dist', express.static(path.join(__dirname,'dist')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/api/categories', (req, res, next) => {
    Category.findAll({
        include: [Product]
    })
    .then( categories => res.send(categories))
    .catch(next); 
})
app.get('/api/categories/:id', (req, res, next) => {
    Category.findById(req.params.id, {
        include: [ Product ]
    })
    .then( category => res.send(category))
    .catch(next)
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

db.syncAndSeed()
    .then(() => console.log('synced and seeded!'))
