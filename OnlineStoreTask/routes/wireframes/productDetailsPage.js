const _ = require('underscore');
const Product = require('../common/db_models/product');
const getDocById = require('../common/getDocumentById');
const convertCurrency = require('../common/convertCurrency.js');

module.exports = async function routeProductPage(req, res) {
  if (_.has(req.query, 'value') === false) {
    const { productID } = req.params;

    // get product
    const product = await Product.findOne({
      id: productID,
    }).lean();

    // get header, navbar and breadcrumb properties
    const document = await getDocById(product.primary_category_id);

    const { prevDocs, mainCategories: categories, currentCatDoc: currentCat } = document;
    prevDocs.push({ id: productID, name: product.name, route: 'view' });

    res.render('wireframesProductDetailsPage', {
      _,
      categories,
      prevDocs,
      currentCat,
      product,
    });
  } else {
    const { currentCurreny, newCurrency, value } = req.query;
    const currencyVal = await convertCurrency(currentCurreny, newCurrency, value);
    res.send(currencyVal.toFixed(2));
  }
};
