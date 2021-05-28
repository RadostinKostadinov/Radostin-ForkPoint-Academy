/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./db_models/product');

mongoose.connect('mongodb://localhost:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});

module.exports = async function getFilteredProducts(dbQueryFilters) {
  let products = [];
  const dbQueryStrings = [];
  try {
    if (dbQueryFilters.gender.length > 0) dbQueryFilters.gender.forEach((gender) => { // gender-?-?
      gender = gender.toLowerCase();
      if (dbQueryFilters.category.length > 0) dbQueryFilters.category.forEach((category) => { // gender-cat-?
        category = category.toLowerCase();
        if (dbQueryFilters.subcategory.length > 0) dbQueryFilters.subcategory.forEach((subcat) => { // gender-cat-subcat
          subcat = subcat.toLowerCase();
          let filter;
          if (subcat === 'outfits') filter = `^${gender}-${subcat}$`;
          else filter = `^${gender}-${category}-${subcat}`;
          dbQueryStrings.push(filter);
        });
        else { // gender-cat-X
          const filter = `^${gender}-${category}`;
          dbQueryStrings.push(filter);
        }
      });
      else
      if (dbQueryFilters.subcategory.length > 0) dbQueryFilters.subcategory.forEach((subcat) => { // gender-X-subcat
        subcat = subcat.toLowerCase();
        let filter;
        if (subcat === 'outfits') filter = `^${gender}-${subcat}$`;
        else filter = `^${gender}-.*-${subcat}$`;
        dbQueryStrings.push(filter);
      });
      else { // gender-X-X
        const filter = `^${gender}-.*$`;
        dbQueryStrings.push(filter);
      }
    });
    else
    if (dbQueryFilters.category.length > 0) dbQueryFilters.category.forEach((category) => { // X-cat-?
      category = category.toLowerCase();
      if (dbQueryFilters.subcategory.length > 0) dbQueryFilters.subcategory.forEach((subcat) => { // X-cat-subcat
        subcat = subcat.toLowerCase();
        let filter;
        if (subcat === 'outfits') filter = `^.*-${subcat}$`;
        else filter = `^.*-${category}-${subcat}$`;
        dbQueryStrings.push(filter);
      });
      else { // X-cat-X
        const filter = `^.*-${category}-.*$`;
        dbQueryStrings.push(filter);
      }
    });
    else // X-X-?
    if (dbQueryFilters.subcategory.length > 0) dbQueryFilters.subcategory.forEach((subcat) => { // X-X-subcat
      subcat = subcat.toLowerCase();
      let filter;
      if (subcat === 'outfits') filter = `^.*-${subcat}$`;
      else filter = `^.*-.*-${subcat}$`;
      dbQueryStrings.push(filter);
    });
    else { // X-X-X
      const filter = '^.*$';
      dbQueryStrings.push(filter);
    }

    for (let i = 0; i < dbQueryStrings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const mypr = await Product.find({
        primary_category_id: {
          $regex: dbQueryStrings[i],
          $options: 'g',
        },
      });
      products = products.concat(mypr);
    }
  } catch (err) {
    console.log(err.message);
  }
  return products;
};

/* // TEST getFilteredProducts
async function test(documentId) {
    const filters = {
        "gender": [],
        "category": ["clothing"],
        "subcategory": []
    }
    const target = await getFilteredProducts(filters);
    console.log('target: ' + target.length);
}

test('mens'); */
