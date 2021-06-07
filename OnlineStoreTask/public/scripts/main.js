/* eslint-disable no-undef */
const selector = $('#currency-selector');
let currentCurreny;
selector.click(() => {
  currentCurreny = selector.val();
});
selector.change(() => {
  const priceEl = $('.curr-value');
  const newCurrency = $('select option:selected').text();
  $.ajax({
    url: '',

    data: {
      currentCurreny,
      newCurrency,
      value: priceEl.html(),
    },

    type: 'GET',

    dataType: 'text',

    success: (res) => {
      priceEl.html(res);
    },

    error: () => {

    },

    // eslint-disable-next-line no-unused-vars
    complete: (xhr, status) => {

    },
  });
});

const imagesInCarousel = $('.image-carousel').length;
const imageOnFocus = $('#image-onfocus');

$('.color').click((ev) => {
  $('.color').removeClass('color-selected');
  $(ev.target).addClass('color-selected');
  const sizes = $('.size');
  sizes.removeClass('variant-available');
  const availableSizes = $(ev.target).data('av-sizes').split(',');
  sizes.each(function _() {
    const size = `${$(this).data('size')}`;
    if (availableSizes.includes(size)) $(this).addClass('variant-available');
  });
});

$('.size').click((ev) => {
  $('.size').removeClass('size-selected');
  $(ev.target).addClass('size-selected');
});

$('.quantity-group .btn:first-of-type').click(() => {
  const inputEl = $('.quantity-group input');
  const currentValue = Number(inputEl.val());
  const nextValue = currentValue - 1;
  if (currentValue !== 1) inputEl.val(nextValue);
});

$('.quantity-group .btn:nth-of-type(2)').click(() => {
  const inputEl = $('.quantity-group input');
  const currentValue = Number(inputEl.val());
  const nextValue = currentValue + 1;
  inputEl.val(nextValue);
});

$('.quantity-group input').change((ev) => {
  const input = $(ev.target);
  if (input.val() < 1) input.val(1);
});

$('#add-to-wishlist').click((ev) => {
  $(ev.target).toggleClass('wishlisted');
});


$('.arrow-up').click(() => {
  const currentImage = $('.image-carousel-current');
  const currentId = currentImage.data('id');
  currentImage.removeClass('image-carousel-current');

  let nextId;
  if (currentId === 0) nextId = imagesInCarousel - 1;
  else nextId = currentId - 1;

  const nextImage = $(`img[data-id=${nextId}]`);
  nextImage.addClass('image-carousel-current');
  const nextSrc = nextImage.attr('src');
  imageOnFocus.attr('src', nextSrc);
});

$('.arrow-down').click(() => {
  const currentImage = $('.image-carousel-current');
  const currentId = currentImage.data('id');
  currentImage.removeClass('image-carousel-current');

  let nextId;
  if (currentId === imagesInCarousel - 1) nextId = 0;
  else nextId = currentId + 1;

  const nextImage = $(`img[data-id=${nextId}]`);
  nextImage.addClass('image-carousel-current');
  const nextSrc = nextImage.attr('src');
  imageOnFocus.attr('src', nextSrc);
});

$('.image-carousel').click((ev) => {
  $('.image-carousel').removeClass('image-carousel-current');
  nextImage = $(ev.target);
  nextImage.addClass('image-carousel-current');
  const nextSrc = nextImage.attr('src');
  imageOnFocus.attr('src', nextSrc);
});
