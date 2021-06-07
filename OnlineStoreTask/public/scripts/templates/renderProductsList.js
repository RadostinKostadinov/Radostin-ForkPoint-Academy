/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-parens */
import {
  html,
  render,
} from 'https://unpkg.com/lit-html?module';

const colorTemplate = (link) => html`<img src="/images/${link}" class="card-color d-inline-block"> `;

const homeTemplate = (product) => html`
<div class="col-md-4 pb-5 px-5">
  <div class="product-card">
            <div class="d-none item-id" data-id="${product.id}"></div>
            <div class="pr-image w-100">
                ${product.images ? html`<img src="/images/${product.images.medium[0]}" class="img-fluid mx-auto d-block">` : ''}
            </div>
            <div class="av-colors w-100 ps-2 my-1">
                ${product.images.swatch.length !== 0 ? product.images.swatch.map(colorTemplate)
    : html`<img src="https://www.pngkey.com/png/full/248-2487877_small-no-colour.png" class="invisible card-color d-inline-block"> `}
            </div>
            <div class="pr-name w-100 ps-2">
                <span>${product.name}</span>
            </div>
            <div class="pr-price w-100 border-top border-2 ps-2">
                <span class="pr-price-value">${product.price}</span>
                <span class="pr-price-currency">EUR</span>
            </div>
    </div>
</div>
`;

export function renderProductsList(products, container) {
  const pr = products.map((product) => homeTemplate(product));
  render(pr, container);
}
