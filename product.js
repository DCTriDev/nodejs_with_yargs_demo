const fs = require('fs');
const productFile = 'product.json';
const STOCK_RECEIVING_AMOUNT = 50;


const createProduct = (_name, _desc, _amount) => {
    return {
        name: _name,
        desc: _desc,
        amount: _amount
    }
}

const handleSave = (productList) => {
    const productListJSON = JSON.stringify(productList);
    fs.writeFileSync(productFile, productListJSON);
    console.log("Complete!");
}

const handleFindIndexByName = (name, arr) => {
    return arr.findIndex(product => product.name === name);
}

const addProduct = (name, desc, amount) => {
    const oldProductList = getProducts();
    const index = handleFindIndexByName(name, oldProductList);
    if (index === -1 || oldProductList.length===0) {
        const newProduct = createProduct(name, desc, amount);
        const newProductList = [...oldProductList, newProduct];
        handleSave(newProductList);
    } else {
        console.log('Product is already exist. Please try again.');
    }
}

const updateProduct = (name, updateName, updateDesc, updateAmount) => {
    const oldProductList = getProducts();
    const updateProduct = createProduct(updateName, updateDesc, updateAmount);
    const newProductList = [...oldProductList]
    console.log(newProductList);
    const index = handleFindIndexByName(name, oldProductList);
    if (index!==-1){
        let isChanged = false;
        for (let key in oldProductList[index]) {
            console.log(updateProduct[key]);
           if(oldProductList[index][key] !== updateProduct[key]&&updateProduct[key]!=='none'&&updateProduct[key]!== undefined){
                newProductList[index][key] = updateProduct[key];
                isChanged = true;
            }
        }
        if (isChanged) {
            handleSave(newProductList);
            console.log(newProductList);
        }
        else {
            console.log('You did not change anything. Please try again.');
        }
    }
    else {
        console.log('Product is not found. Please try again.');
    }
}

const deleteProduct = (name) => {
    const oldProductList = getProducts();
    const newProductList = oldProductList.filter(product => product.name !== name);
    handleSave(newProductList);
}

const stockReceivingProduct = (name) => {
    const productList = getProducts();
    const index = handleFindIndexByName(name, productList);
    if (index!==-1){
        productList[index].amount += STOCK_RECEIVING_AMOUNT;
        handleSave(productList);
    }
    else {
        console.log('Product is not found. Please try again.');
    }
}

const getProducts = () => {
    try {
        const dataBuffer = fs.readFileSync(productFile);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.stockReceivingProduct = stockReceivingProduct;