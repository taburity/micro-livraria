const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const products = require('./products.json');

const packageDefinition = protoLoader.loadSync('proto/inventory.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const inventoryProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// implementa os métodos do InventoryService
server.addService(inventoryProto.InventoryService.service, {
    searchAllProducts: (_, callback) => {
        callback(null, {
            products: products,
        });
    },
    SearchProductByID: (payload, callback) => {
        let product = products.find((product) => product.id == payload.request.id);
        if (product) {
            product.student_name = "Carlos"; 
        }

        callback(null, product);
    },
});

// Usando 0.0.0.0 para garantir a compatibilidade com o Codespaces
server.bindAsync('0.0.0.0:3002', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Inventory Service running at http://0.0.0.0:3002');
    server.start();
});