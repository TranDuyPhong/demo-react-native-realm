const Realm = require('realm');

class ProductSchema { }

ProductSchema.schema = {
    name: 'Product',
    primaryKey: 'id',
    properties: {
        id: 'string',
        title: 'string',
        price: 'float',
        image: 'string',
        createdDate: 'date',
        createdBy: 'string',
        modifiedDate: {
            type: 'data?',
            default: null
        },
        modifiedBy: {
            type: 'string',
            default: ''
        }
    }
};

const databaseOptions = {
    path: 'productDemoRealm.realm',
    schema: [ProductSchema],
    schemaVersion: 0
};

const getListProduct = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        const products = realm.objects('Product');
        resolve(products.sorted('createdDate', true));
    }).catch(err => {
        reject(err);
    });
});

const addProduct = (product) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            realm.create('Product', product);
            resolve(product);
        });
    }).catch(err => {
        reject(err);
    });
});

const getOneProduct = (id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        const product = realm.objectForPrimaryKey('Product', id);
        resolve(product);
    }).catch(err => {
        reject(err);
    });
});

const editProduct = (product) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            const productEdit = realm.objectForPrimaryKey('Product', product.id);
            productEdit.title = product.title;
            productEdit.price = product.price;
            productEdit.image = product.image;
            resolve(productEdit);
        });
    }).catch(err => {
        reject(err);
    });
});

const deleteProduct = (id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            const productDelete = realm.objectForPrimaryKey('Product', id);
            realm.delete(productDelete);
            resolve(productDelete);
        });
    }).catch(err => {
        reject(err);
    });
});

export {
    getListProduct,
    addProduct,
    getOneProduct,
    editProduct,
    deleteProduct
};