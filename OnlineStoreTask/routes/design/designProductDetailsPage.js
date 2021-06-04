const _ = require('underscore');
const Product = require('../common/db_models/product');
const convertCurrency = require('../common/convertCurrency.js');

module.exports = async function routeProductPage(req, res) {
  if (_.has(req.query, 'value') === false) {
    const {
      productID,
    } = req.params;
    const simplifiedVariants = [];

    // get product
    const product = await Product.findOne({
      id: productID,
    }).lean();

    // get object with all available colors
    const colorsObj = _.find(product.variation_attributes, (object) => {
      const val = object.name.toLowerCase();
      return val === 'color';
    });


    if (colorsObj) {
      /* for each available color, generate 'simplifiedVariant',
      that includes image of a color(link) and available sizes for this color */
      _.each(colorsObj.values, (objc) => {
        const colorId = objc.value;

        // get color's image link (swatch)
        const swatchObj = _.find(product.image_groups, object => object.view_type === 'swatch' && colorId === object.variation_value);
        const swatchImg = swatchObj.images[0].link;

        // get available sizes for this color
        const availabeSizes = _.reduce(product.variants, (sizes, varObj) => {
          if (varObj.variation_values.color === colorId) {
            sizes.push(varObj.variation_values.size);
            return sizes;
          }
          return sizes;
        }, []);

        // get price for this color
        const variantWithThisColor = _
          .find(product.variants, object => object.variation_values.color === colorId);
        const {
          price,
        } = variantWithThisColor;

        // push this "color variant" to all variants
        simplifiedVariants.push({
          colorId,
          swatch_img: `/images/${swatchImg}`,
          avaiable_sizes: availabeSizes,
          price,
        });
      });
    }

    // get available product sizes
    const productSizes = [];
    // eslint-disable-next-line no-prototype-builtins
    if (product.hasOwnProperty('variation_attributes')) {
      const sizesObject = product.variation_attributes.find(object => object.name === 'Size' || object.name === 'size');
      if (sizesObject) {
        _.each(sizesObject.values, (valueObj) => {
          if (valueObj.orderable) {
            productSizes.push(valueObj.value);
          }
        });
      }
    }

    product.sizes = productSizes;
    product.simplifiedVariants = simplifiedVariants;
    const productsCount = await Product.countDocuments();

    res.render('designProductDetails', {
      _,
      product,
      productsCount,
    });
  } else {
    const {
      currentCurreny,
      newCurrency,
      value,
    } = req.query;
    const currency = await convertCurrency(currentCurreny, newCurrency, value);
    res.send(currency.toFixed(2));
  }
};
