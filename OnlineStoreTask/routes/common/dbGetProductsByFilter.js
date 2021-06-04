require('dotenv').config();
const Product = require('./db_models/product');

module.exports = async function getFilteredProducts(dbQueryFilters) {
  let products = [];
  const dbQueryStrings = [];
  try {
    if (dbQueryFilters.gender.length > 0) {
      dbQueryFilters.gender.forEach((gender) => { // gender-?-?
        const gnd = gender.toLowerCase();
        if (dbQueryFilters.category.length > 0) {
          dbQueryFilters.category.forEach((category) => { // gender-cat-?
            const categ = category.toLowerCase();
            if (dbQueryFilters.subcategory.length > 0) {
              dbQueryFilters.subcategory.forEach((subcat) => { // gender-cat-subcat
                const subc = subcat.toLowerCase();
                let filter;
                if (subc === 'outfits') {
                  filter = `^${gnd}-${subc}$`;
                } else {
                  filter = `^${gnd}-${categ}-${subc}`;
                }
                dbQueryStrings.push(filter);
              });
            } else { // gender-cat-X
              const filter = `^${gnd}-${categ}`;
              dbQueryStrings.push(filter);
            }
          });
        } else if (dbQueryFilters.subcategory.length > 0) {
          dbQueryFilters.subcategory.forEach((subcat) => { // gender-X-subcat
            const subc = subcat.toLowerCase();
            let filter;
            if (subc === 'outfits') {
              filter = `^${gnd}-${subc}$`;
            } else {
              filter = `^${gnd}-.*-${subc}$`;
            }
            dbQueryStrings.push(filter);
          });
        } else { // gender-X-X
          const filter = `^${gnd}-.*$`;
          dbQueryStrings.push(filter);
        }
      });
    } else if (dbQueryFilters.category.length > 0) {
      dbQueryFilters.category.forEach((category) => { // X-cat-?
        const categ = category.toLowerCase();
        if (dbQueryFilters.subcategory.length > 0) {
          dbQueryFilters.subcategory.forEach((subcat) => { // X-cat-subcat
            const subc = subcat.toLowerCase();
            let filter;
            if (subc === 'outfits') {
              filter = `^.*-${subc}$`;
            } else {
              filter = `^.*-${categ}-${subc}$`;
            }
            dbQueryStrings.push(filter);
          });
        } else { // X-cat-X
          const filter = `^.*-${categ}-.*$`;
          dbQueryStrings.push(filter);
        }
      });
    } else if (dbQueryFilters.subcategory.length > 0) {
      dbQueryFilters.subcategory.forEach((subcat) => {
        const subc = subcat.toLowerCase();
        let filter;
        if (subc === 'outfits') {
          filter = `^.*-${subc}$`;
        } else {
          filter = `^.*-.*-${subc}$`;
        }
        dbQueryStrings.push(filter);
      });
    } else { // X-X-X
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
    return err.message;
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
