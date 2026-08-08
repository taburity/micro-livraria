const express = require('express');
const shipping = require('./shipping');
const inventory = require('./inventory');
const cors = require('cors');

console.log("Funções de Inventory:", Object.keys(inventory));
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

/**
 * Inicia o router
 */
app.listen(3000, () => {
    console.log('Controller Service running on http://127.0.0.1:3000');
});

/**
 * Retorna os detalhes de um produto específico
 * integrando dados de Inventory e Shipping.
 */
app.get('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    inventory.SearchAllProducts({}, (err, data) => {
        if (err || !data || !data.products) {
            console.error("Erro no Inventory:", err);
            return res.status(500).json({ error: "Erro ao consultar Inventory" });
        }
        const productData = data.products.find(p => p.id === productId);

        if (!productData) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        shipping.GetShippingRate({ id: productId }, (err, shippingData) => {
            if (err || !shippingData) {
                console.error("Erro no Shipping:", err);
                return res.status(500).json({ error: "Erro ao consultar Shipping" });
            }

            res.json({
                id: productData.id,
                name: productData.name,
                quantity: productData.quantity,
                price: shippingData.value, 
                photo: productData.photo,
                author: shippingData.author
            });
        });
    });
});