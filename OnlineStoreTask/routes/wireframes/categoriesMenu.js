const _ = require('underscore');
const getCategoryById = require('../common/getDocumentById');

module.exports = async function routeCategoryPage(req, res) {
  const currentCategoryID = req.params.categoryID;
  const document = await getCategoryById(currentCategoryID);

  const { prevDocs, mainCategories: categories, currentCatDoc: currentCat } = document;
  res.render('wireframesCategoriesMenu', {
    _,
    categories,
    prevDocs,
    currentCat,
  });
};
