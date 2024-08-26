//** Frontend Automation **

describe('Search Product', () => 
    {
    it('Search for Titan watch on flipkart.com', () => 
      {
      // Open Flipkart.com in Google Chrome
      cy.visit('https://www.flipkart.com')
  
      // Search for the product
      cy.get('input[name="field-keywords"]').type('Titan watch')
      cy.get('input[type="submit"]').click()
  
      // Wait for the search results to load
      cy.get('div.s-result-item').should('be.visible')
  
      // Capture product details
      cy.get('div.s-result-item').first().within(() => 
        {
        cy.get('h2').invoke('text').as('productName')
        cy.get('span.a-price-whole').invoke('text').as('productPrice')
        cy.get('a.a-link-normal').invoke('attr', 'href').as('productLink')
      })
  
      // Select the first product and navigate to Add to Cart screen
      cy.get('div.s-result-item').first().find('a.a-link-normal').click()
      cy.get('input#add-to-cart-button').click()
  
      // Wait for the Add to Cart screen to load
      cy.get('div.a-box-group').should('be.visible')
  
      // Navigate to Buy Now screen
      cy.get('input#buy-now-button').click()
  
      // Wait for the Buy Now screen to load
      cy.get('div.a-box-group').should('be.visible')
  
      // Navigate to Payment Gateway screen
      cy.get('input#payment-gateway-button').click()
  
      // Wait for the Payment Gateway screen to load
      cy.get('div.a-box-group').should('be.visible')
    })
  })