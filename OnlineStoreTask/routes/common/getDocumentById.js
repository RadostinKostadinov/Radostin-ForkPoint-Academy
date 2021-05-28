/* eslint-disable no-console */
require('dotenv').config();
const _ = require('underscore');
const mongoose = require('mongoose');
const Category = require('./db_models/category');

mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => { console.log(error); });
db.once('open', () => { console.log('getDocumentById.js -> Connected to Database'); });

module.exports = async function getCategoryById(catId) {
  const path = catId.split('-');
  const majorCatId = path[0];
  let result;
  let document;
  const prevDocs = [];
  try {
    // Get names of main categories
    const categories = await Category.find().select({ id: 1, _id: 0 });

    // Get document of the major category
    const majorCategory = await Category.find({ id: majorCatId }).lean();

    // Get document of the requested category
    let currDocumentId = majorCatId;
    prevDocs.push({ id: currDocumentId, name: currDocumentId, route: 'wireframes/categories' });
    let documentToSearchIn = majorCategory[0];
    let isNested = false;
    for (let i = 1; i < path.length; i += 1) {
      currDocumentId += `-${path[i]}`;
      const prevDoc = {};
      Object.assign(prevDoc, documentToSearchIn);

      // -

      while (_.has(documentToSearchIn, 'categories')) {
        // eslint-disable-next-line no-loop-func
        documentToSearchIn = documentToSearchIn.categories.find(cat => cat.id === currDocumentId);
        if (documentToSearchIn !== undefined) break;
        // eslint-disable-next-line no-loop-func
        prevDoc.categories.forEach((category) => {
          // eslint-disable-next-line no-loop-func
          if (_.has(category, 'categories')) {
            documentToSearchIn = category.categories.find(cat => cat.id === currDocumentId);
            if (documentToSearchIn !== undefined) {
              let currpath = documentToSearchIn.parent_category_id;
              let currDocumentName = currpath.replace(`${prevDocs[prevDocs.length - 1].id}-`, '');
              prevDocs.push({
                id: documentToSearchIn.parent_category_id,
                name: currDocumentName,
                route: 'wireframes/categories',
              });

              isNested = true;
              document = documentToSearchIn;
              currpath = currDocumentId;
              currDocumentName = currpath.replace(`${prevDocs[prevDocs.length - 2].id}-`, '');
              const currDocumentRoute = _.has(documentToSearchIn, 'categories') ? 'wireframes/categories' : 'wireframes/products';
              prevDocs.push({
                id: currDocumentId,
                name: currDocumentName,
                route: currDocumentRoute,
              });
            }
          }
        });
      }

      if (documentToSearchIn === undefined && i !== path.length - 1) documentToSearchIn = prevDoc;
      else if (isNested === false) {
        const currpath = currDocumentId;
        const currDocumentName = currpath.replace(`${prevDocs[prevDocs.length - 1].id}-`, '');
        const currDocumentRoute = _.has(documentToSearchIn, 'categories') ? 'wireframes/categories' : 'wireframes/products';
        prevDocs.push({ id: currDocumentId, name: currDocumentName, route: currDocumentRoute });
      } else isNested = false;

      // -
      /* // eslint-disable-next-line no-loop-func
      documentToSearchIn = documentToSearchIn.categories.find(cat => cat.id === currDocumentId);
      if (documentToSearchIn === undefined) {
        i += 1;
        currDocumentId += `-${path[i]}`;
        // eslint-disable-next-line no-loop-func
        documentToSearchIn = prevDoc.categories.find(cat => cat.id === currDocumentId);
      } */
    }
    result = {
      currentCatDoc: documentToSearchIn || document,
      prevDocs,
      mainCategories: categories,
    };
  } catch (err) {
    console.log(err.message);
  }
  return result;
};

// TEST getCategoryById
/* async function test(documentId) {
  const target = await getCategoryById(documentId);
  console.log(target);
}

// module.exports.getDocById = getDocById();
test('mens'); */
