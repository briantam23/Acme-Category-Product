const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-category-product', { logging: false });

const Category = conn.define('category', {
    name: Sequelize.STRING
})
const Product = conn.define('product', {
    name: Sequelize.STRING
})

Product.belongsTo(Category);
Category.hasMany(Product);

const syncAndSeed = () => {
    return conn.sync( { force: true })
        .then(async () => {
            const [computer, headphones, television] = await Promise.all([
                Category.create({ name: 'computer'}),
                Category.create({ name: 'headphones' }),
                Category.create({ name: 'television' })
            ]);
            const [laptopComputer, bluetoothHeadphones, smartTv, noiseCancellingHeadphones] = await Promise.all([
                Product.create({ name: 'laptop computer'}),
                Product.create({ name: 'bluetooth headphones'}),
                Product.create({ name: 'smart tv'}),
                Product.create({ name: 'noise cancelling headphones'})
            ]);
            await Promise.all([
                computer.addProduct(laptopComputer),
                headphones.addProducts([bluetoothHeadphones, noiseCancellingHeadphones]),
                television.addProduct(smartTv)
            ]);
        }
    )
}

module.exports = {
    syncAndSeed,
    models: {
        Category,
        Product
    }
}

/* const seed = () => {
    let computer, headphones, television, laptopComputer, bluetoothHeadphones, smartTv, noiseCancellingHeadphones;
    return Promise.all([
        Category.create({ name: 'computer'}),
        Category.create({ name: 'headphones' }),
        Category.create({ name: 'television' })
    ])
    .then((categories) => {
        [computer, headphones, television] = categories;
        return Promise.all([
            Product.create({ name: 'laptop computer'}),
            Product.create({ name: 'bluetooth headphones'}),
            Product.create({ name: 'smart tv'}),
            Product.create({ name: 'noise cancelling headphones'})
        ])
    })
    .then( products => {
        [laptopComputer, bluetoothHeadphones, smartTv, noiseCancellingHeadphones] = products;
        return Promise.all([
            computer.addProduct(laptopComputer),
            headphones.addProducts([bluetoothHeadphones, noiseCancellingHeadphones]),
            television.addProduct(smartTv)
        ])
    })
} */