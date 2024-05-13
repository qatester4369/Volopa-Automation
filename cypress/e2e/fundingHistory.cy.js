/// <reference types = "Cypress"/>

import { FundingHistory } from "../PageObject/PageAction/FundingHistory"

const fundingHistory = new FundingHistory

describe('Funding History',function(){
    
    beforeEach(() => {
        cy.visit('https://uiredevelopment.volopa.com/')
        cy.get('#username').type('qwerty_admin_1')
        cy.get('#password').type('testTest1')
        cy.get('.ant-btn').click()
        cy.viewport(1440,1000)
    })
    it('TC-FH-001 - Validate the clicking on "funding history" from header navigate the user to "your transaction history" page', function(){
        fundingHistory.goToFundingHistoryPage()
    })
    it('TC-FH-002 - Validate that search functionality is working fine on "Your transaction history" page with admin', function(){
        fundingHistory.goToFundingHistoryPage()
        fundingHistory.validateSearchField('alex')
    })
    it('TC-FH-003 - Validate that search functionality is working fine on "Your transaction history" page with discription', function(){
        fundingHistory.goToFundingHistoryPage()
        fundingHistory.validateSearchField('Test')
    })
    it('TC-FH-004 - Validate that the pagination is working fine on "your transaction history" page', function(){
        fundingHistory.goToFundingHistoryPage()
        const isNextButtonEnabled = () => {
          return cy.get("li[title='Next Page'] button[type='button']").then($button => {
            return !$button.prop('disabled');
          });
        };
    
        // Loop until the "Next" button is disabled
        const validatePages = () => {
          isNextButtonEnabled().then(enabled => {
            if (enabled) {
              // Perform validations specific to each page
              // For example, assert that certain elements exist or have specific content
              cy.get('[class="ant-table-row ant-table-row-level-0 row-border medium fs-18px "]').eq(0).should('exist')
              // Click the "Next" button
              cy.get("li[title='Next Page'] button[type='button']").click();
    
              // Wait for the page to load (adjust as needed)
              cy.wait(1000); // Adjust the wait time as needed
    
              // Recursively call the function to validate the next page
              validatePages();
            } else {
              // Assert that the "Next" button is now disabled
              cy.get("li[title='Next Page'] button[type='button']").should('be.disabled');
    
              // Assert any element on the last page to confirm arrival (optional)
             // cy.get('.last-page-element').should('exist'); // Replace with actual selector for element on last page
            }
          });
        };
    
        // Start validating pages
        validatePages();
      })
})