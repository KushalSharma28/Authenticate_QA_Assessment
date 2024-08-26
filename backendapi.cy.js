//** Backend Automation **

describe('API Testing and Comparison', () => 
    {
    it('Search for Titan watch on Amazon.in and validate API response', () =>
        {
      // Search for the product using the Amazon.in search API
      cy.request({
        method: 'GET',
        url: 'https://www.amazon.in/s',
        qs: {
          k: 'Titan watch',
        },
      })
        .then((response) => 
        {
          // Validate the API response structure and content
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('results');
          expect(response.body.results).to.be.an('array');
  
          // Extract the product ID from the API response
          const productId = response.body.results[0].asin;
  
          // Use the product ID to fetch detailed product information
          cy.request({
            method: 'GET',
            url: `https://www.amazon.in/dp/${productId}`,
          })
            .then((productResponse) => 
            {
              // Validate the product details
              expect(productResponse.status).to.equal(200);
              expect(productResponse.body).to.have.property('product');
              expect(productResponse.body.product).to.have.property('title');
              expect(productResponse.body.product).to.have.property('price');
  
              // Compare the product details with the frontend automation data
              cy.get('@productName').then((productName) => 
            {
                expect(productResponse.body.product.title).to.equal(productName);
              });
              cy.get('@productPrice').then((productPrice) => 
            {
                expect(productResponse.body.product.price).to.equal(productPrice);
              });
            });
        });
    });
  
    it('Compare prices of Titan watch on Amazon.in and Flipkart', () => 
    {
      // Search for the product on Flipkart using the Flipkart search API
      cy.request({
        method: 'GET',
        url: 'https://www.flipkart.com/search',
        qs: {
          q: 'Titan watch',
        },
      })
        .then((response) => 
        {
          // Validate the API response structure and content
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('products');
          expect(response.body.products).to.be.an('array');
  
          // Extract the product price from the API response
          const flipkartPrice = response.body.products[0].price;
  
          // Compare the prices of the product on both platforms
          cy.get('@productPrice').then((amazonPrice) => 
            {
            if (flipkartPrice < amazonPrice) 
            {
              cy.log(`Flipkart offers the lowest price: ${flipkartPrice}`);
            } else 
            {
              cy.log(`Amazon offers the lowest price: ${amazonPrice}`);
            }
          });
        });
    });
  });