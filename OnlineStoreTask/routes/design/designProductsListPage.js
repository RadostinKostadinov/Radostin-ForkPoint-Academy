/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const _ = require('underscore');

const Product = require('../common/db_models/product');
const getFilteredProducts = require('../common/dbGetProductsByFilter');

module.exports = async function routeProductsPage(req, res) {
  const dbQueryFilters = {
    gender: [],
    category: [],
    subcategory: [],
  };

  if (_.keys(req.query).length > 0) {
    if (req.query.gender !== '') dbQueryFilters.gender = req.query.gender.split(',');
    if (req.query.category !== '') dbQueryFilters.category = req.query.category.split(',');
    if (req.query.subcategory !== '') dbQueryFilters.subcategory = req.query.subcategory.split(',');
  }

  const filteredProducts = await getFilteredProducts(dbQueryFilters);

  const images = {
    swatch: [],
    medium: [],
  };
  const colors = [];
  if (filteredProducts.length > 0) _.each(filteredProducts, (product) => {
    const colorsObj = _.find(product.variation_attributes, (object) => {
      const val = object.name.toLowerCase();
      return val === 'color';
    });

    if (colorsObj) {
      colors.length = 0;
      _.each(colorsObj.values, (objc) => {
        colors.push(objc.value);
      });

      _.each(product.image_groups, (object) => {
        if (object.view_type === 'swatch'
        && _.contains(colors, object.variation_value)
        && _.contains(images.swatch, object.images[0].link) === false) images.swatch.push(object.images[0].link);
      });
    }

    const mediumImageObject = _.find(product.image_groups, obj => obj.view_type === 'medium');
    images.medium.push(mediumImageObject.images[0].link);

    product.images = JSON.parse(JSON.stringify(images));
    product._doc.images = JSON.parse(JSON.stringify(images));
    images.swatch.length = 0;
    images.medium.length = 0;
  });

  const products = filteredProducts.slice(0, 12); // solution == pagination
  // eslint-disable-next-line curly
  if (_.keys(req.query).length === 0) {
    const productsCount = await Product.countDocuments();
    res.render('designProductsList', {
      _,
      products,
      productsCount,
    });
  } else {
    const filteredCount = filteredProducts.length;
    res.send({ products, filteredCount });
  }
};
