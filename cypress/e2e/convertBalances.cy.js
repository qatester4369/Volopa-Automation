/// <reference types = "Cypress"/>

import { ConvertBalances } from "../PageObject/PageAction/ConvertBalances"

const convertBalancesPage = new ConvertBalances

describe('Convert Balances',function(){
    
    beforeEach(() => {
        cy.visit('https://uiredevelopment.volopa.com/')
        cy.get('#username').type('alexceaki+0141@gmail.com')
        cy.get('#password').type('testTest1')
        cy.get('.ant-btn').click()
        cy.viewport(1440,1000)
    })
    it('TC-CB-001 - Verify that clicking on "convert balance" from header navigate to the convert balances page', function(){
       convertBalancesPage.goToConvertBalancesAndValidate()
    })
    it('TC-CB-002 - Validate that the "company wallet balance" table is displayed on convert balances page', function(){
        convertBalancesPage.goToConvertBalancesAndValidate()
        convertBalancesPage.validateCompanyWalletBalance()
    })
    it('TC-CB-003 - Validate that clicking on "View all" from "company wallet balance" table expands the table with all currencies', function(){
        convertBalancesPage.goToConvertBalancesAndValidate()
        convertBalancesPage.validateViewAllCurrenciesBtn()
    })
    xit('TC-CB-004 - Verify "Total Euro Value" is displayed in Company wallet Balance table', function(){
        convertBalancesPage.goToConvertBalancesAndValidate()

    })
    it('TC-CB-005 - Verify that user can convert balances', function(){
        convertBalancesPage.goToConvertBalancesAndValidate()
        convertBalancesPage.validateConvertBalance()
    })
    it('TC-CB-006 - Verify that the balance shouldnt convert if the available balance is lower than the inputted amount ', function(){
        convertBalancesPage.goToConvertBalancesAndValidate()
        convertBalancesPage.convertInsufficientBalance()
    })
    it('TC-CB-007 -Verify that the convert button should be disabled it the user input the amount "0"', function(){
        convertBalancesPage.goToConvertBalancesAndValidate()
        convertBalancesPage.convertZeroBalance()
    })
    it('TC-CB-008 -Verify that "convert more" button updated the company wallet table', function(){
        convertBalancesPage.goToConvertBalancesAndValidate()
        convertBalancesPage.clickonConvertMore()
    })
})    