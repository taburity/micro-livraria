const express = require('express');
const shipping = require('./shipping');
const inventory = require('./inventory');
const cors = require('cors');

const app = express();
app.use(cors());

/**
 * Retorna a lista de produtos da loja via InventoryService
 */
app.get('/products', (req, res, next) => {
    inventory.SearchAllProducts(null, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'something failed :(' });
        } else {
            res.json(data.products);
        }
    });
});

/**
 * Consulta o frete de envio no ShippingService
 */
app.get('/shipping/:cep', (req, res, next) => {
    shipping.GetShippingRate(
        {
            cep: req.params.cep,
        },
        (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'something failed :(' });
            } else {
                res.json({
                    cep: req.params.cep,
                    value: data.value,
                });
            }
        }
    );
});

app.get('/product/:id', (req, res, next) => {
    const productId = parseInt(req.params.id);

    inventory.SearchAllProducts(null, (err, data) => {
        if (err || !data || !data.products) {
            console.error(err);
            return res.status(500).send({ error: 'something failed :(' });
        }

        const productData = data.products.find(p => p.id === productId);

        if (!productData) {
            return res.status(404).send({ error: 'product not found :(' });
        }

        res.json({
            id: productData.id,
            name: productData.name,
            quantity: productData.quantity,
            price: productData.price,
            photo: productData.photo,
            author: productData.author,
            student_name: "Luana Siqueira de Sousa"
        });
    });
});

/**
 * Inicia o router
 */
app.listen(3000, () => {
    console.log('Controller Service running on http://127.0.0.1:3000');
});