const _ = require('underscore');
const Category = require('../common/db_models/category');

module.exports = async function routeIndex(req, res) {
  const categories = await Category.find({}).select({ id: 1, _id: 0 });

  res.render('wireframesIndex', {
    _,
    categories,
    prevDocs: [{ id: 'Index Page' }],
    currentCat: { id: 'Index Page' },
  });
};
