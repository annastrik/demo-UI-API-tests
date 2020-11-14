const { expect } = require('chai');

describe('TEST AMAZON PAGE', () => {
  before('go to amazom.com', () => {
    browser.url('https://www.amazon.com/');
    browser.maximizeWindow();
  });

  it('should search for product', () =>{
    browser.$('//input[@id="twotabsearchtextbox"]').setValue('party heels lifestride');
    browser.pause(500);
    browser.$('//input[@type="submit"]').click();
    browser.pause(500);
  });

  it('should sort by department', () =>{
    browser.$('//select[@id="searchDropdownBox"]').selectByVisibleText('Clothing, Shoes & Jewelry');
    browser.pause(500);
  });

  it('should sort by `prime` option', () =>{
    browser.$$('//i[@class="a-icon a-icon-checkbox"]')[0].click();
    browser.pause(500);
  });

  let max = 0;
  let maxDiscountProductLink;
  let productInListTitle;

  it('should find the product with the maximum discount %', () =>{
    /* the below loop takes all products on the page one by one and checks if there is the discounted price, if yes,
        it takes two prices (original and discounted) and calculates the percentage of discount, then it finds
        the product with the highest discount percentage on a page
        */
    while (true) {
      browser.pause(500);
      const products = $$('//div[@data-index]');
      const count = products.length;
      for (let j = 1; j <= count; j++) {
        if ($(`(${'//div[@data-index]'})[${j}]//span[@class = "a-price a-text-price"]`).isExisting()) {
          const originalPrice = $(`(${'//div[@data-index]'})[${j}]//span[@class = "a-price a-text-price"]`).getText().slice(1);
          const discountPrice = $(`(${'//div[@data-index]'})[${j}]//span[@class = "a-price"]`).getText().replace(/\s/g, '.').slice(1);
          const discountPercent = (+originalPrice / +discountPrice).toFixed(2);
          if (+discountPercent > max) {
            max = +discountPercent;
            maxDiscountProductLink = $(`(${'//div[@data-index]'})[${j}]//a`).getAttribute('href');
          }
        }
      }
      browser.$('//ul[@class="a-pagination"]').scrollIntoView();
      browser.pause(500);
      const nextButton = browser.$('//ul[@class="a-pagination"]//a[text() = "Next"]');
      if (nextButton.isClickable()) {
        nextButton.click();
        browser.pause(500);
      } else {break;}
    }
  });

  it('should open the product with maximum discount and add it to bag', () =>{
    browser.url(maxDiscountProductLink);
    browser.pause(200);
    /* There are several options on amazon product page that affect the scenarios the product is added to the cart:
         - sometimes there is `size` selection on a product page, sometimes not - thus the first `if` is added below;
         - sometimes selected size is unavailable, so `Add to cart` button does not show - thus the second `if` is added and
         a loop that keeps selecting other size until one becomes available and `Add to cart`button appears.
         */
    const sizeSelection = browser.$('//select[@id="native_dropdown_selected_size_name"]');
    const addToCartBtn= browser.$('//input[@id="add-to-cart-button"]');
    if (sizeSelection.isExisting()) {
      for (let i = 1; i < 10; i++) {
        sizeSelection.selectByIndex(i);
        if (addToCartBtn.isExisting()) {
          browser.pause(1000);
          productInListTitle = browser.$('//div[@id="centerCol"]//div[@id="averageCustomerReviews"]').getAttribute('data-asin');
          addToCartBtn.click();
          browser.pause(1000); break;
        }
      }
    } else {
      addToCartBtn.click();
      browser.pause(600);
    }
  });

  it('should check that the correct item has been added to the cart', () =>{
    browser.$('//a[@id="nav-cart"]').click();
    browser.refresh();
    const productInCartTitle = browser.$('//div[@data-name="Active Items"]//div[@data-asin]').getAttribute('data-asin');
    expect((productInCartTitle).includes(productInListTitle)).true;
  });
});
