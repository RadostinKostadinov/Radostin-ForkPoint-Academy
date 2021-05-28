const _ = require('underscore');
const Product = require('../common/db_models/product');
const getDocById = require('../common/getDocumentById');

module.exports = async function routeProductsPage(req, res) {
  const currCatId = req.params.categoryID;

  // Get document (required for header, navbar)
  const document = await getDocById(currCatId);

  // Get products
  const products = await Product.find({
    primary_category_id: currCatId,
  }).select({
    name: 1,
    short_description: 1,
    image_groups: 1,
    price: 1,
    id: 1,
    _id: 0,
  }).lean();

  const { prevDocs, mainCategories: categories, currentCatDoc: currentCat } = document;
  res.render('wireframesProductsListPage', {
    _,
    categories,
    prevDocs,
    currentCat,
    products,
  });
};
