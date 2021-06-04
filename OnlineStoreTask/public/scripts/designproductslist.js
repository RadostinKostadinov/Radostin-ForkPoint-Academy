/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { renderProductsList } from './templates/renderProductsList.js';

$('#slider-range').slider({
  range: true,
  min: 0,
  max: 1000,
  values: [200, 800],
  slide(_event, ui) {
    $('#amount').val(`$${ui.values[0]} - $${ui.values[1]}`);
  },
});
$('#amount').val(`$${$('#slider-range').slider('values', 0)
} - $${$('#slider-range').slider('values', 1)}`);

$('.color').click((ev) => {
  $('.color').removeClass('color-selected');
  $(ev.target).addClass('color-selected');
});

$('.size').click((ev) => {
  $('.size').removeClass('size-selected');
  $(ev.target).addClass('size-selected');
});

$('#collapseGender > div > span, #collapseCategory > div > span, #collapseSubCategory > div > span')
  .on('click', function b() {
    if ($(this).hasClass('option-selected')) {
      $(this).removeClass('option-selected');
      $(this).siblings().removeClass('visible').addClass('invisible');
    } else {
      $(this).addClass('option-selected');
      $(this).siblings().removeClass('invisible').addClass('visible');
    }

    const dbQueryFilters = {
      gender: [],
      category: [],
      subcategory: [],
    };

    $('#collapseGender > div > .option-selected').each(function a() {
      dbQueryFilters.gender.push($(this).text());
    });

    $('#collapseCategory > div > .option-selected').each(function a() {
      dbQueryFilters.category.push($(this).text());
    });

    $('#collapseSubCategory > div > .option-selected').each(function a() {
      dbQueryFilters.subcategory.push($(this).text());
    });

    $.ajax({
      type: 'GET',
      url: `?gender=${dbQueryFilters.gender}&category=${dbQueryFilters.category}&subcategory=${dbQueryFilters.subcategory}`,
      success(data) {
        renderProductsList(data.products, document.getElementById('products-list'));
        $('#items-count').html(data.filteredCount);
        $('.product-card').on('click', (ev) => {
          $(location).attr('href', `/design/product/${ev.currentTarget.children[0].dataset.id}`);
        });
      },
      error() {
      },
    });
  });

$('.resetbtn').on('click', () => {
  $('.option-selected').removeClass('option-selected');
  $('.visible').removeClass('visible').addClass('invisible');

  // eslint-disable-next-line no-unused-vars
  const dbQueryFilters = {
    gender: [],
    category: [],
    subcategory: [],
  };

  $.ajax({
    type: 'GET',
    url: `?gender=${dbQueryFilters.gender}&category=${dbQueryFilters.category}&subcategory=${dbQueryFilters.subcategory}`,
    success(data) {
      renderProductsList(data.products, document.getElementById('products-list'));
      $('#items-count').html(data.filteredCount);
      $('.product-card').on('click', (ev) => {
        $(location).attr('href', `/design/product/${ev.currentTarget.children[0].dataset.id}`);
      });
    },
    error() {
    },
  });
});

$('.product-card').on('click', (ev) => {
  $(location).attr('href', `/design/product/${ev.currentTarget.children[0].dataset.id}`);
});
