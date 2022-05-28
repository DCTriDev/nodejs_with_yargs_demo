const {command} = require('yargs');
const product = require('./product');

command({
    command: 'addProduct',
    builder: {
        name: {
            type: 'string'
        },
        desc: {
            type: 'string'
        },
        amount:{
            type: 'number'
        }
    },
    handler: function (argvs) {
        product.addProduct(argvs.name, argvs.desc, argvs.amount);
    }
}).command({
    command: 'updateProduct',
    builder: {
        name: {
            type: 'string'
        },
        updateName: {
            type: 'string'
        },
        updateDesc: {
            type: 'string'
        },
        updateAmount:{
            type: 'number'
        }
    },
    handler: function (argvs) {
        product.updateProduct(argvs.name, argvs.updateName, argvs.updateDesc, argvs.updateAmount);
    }
}).command({
    command: 'deleteProduct',
    builder: {
        name: {
            type: 'string'
        }
    },
    handler: function (argvs) {
        product.deleteProduct(argvs.name);
    }
}).command({
    command: 'stockReceivingProduct',
    builder: {
        name: {
            type: 'string'
        }
    },
    handler: function (argvs) {
        product.stockReceivingProduct(argvs.name);
    }
}).argv;

//-----------------Demo command----------------------

//------Add product---------
//node .\App.js addProduct --name="1" --desc="1" --amount="1"

//------Update product------
// node .\App.js updateProduct --name="1" --updateName="1" --updateDesc="1" --updateAmount="2"

//------Delete product------
// node .\App.js deleteProduct --name="1"

//------Stock receiving product-------
// node .\App.js stockReceivingProduct --name="1"
