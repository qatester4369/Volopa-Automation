/// <reference types = "Cypress"/>

import { FundWallet } from "../PageObject/PageAction/FundWallet"

const fundWallet = new FundWallet

describe('FundWallet TS_003 ',function(){
    
    beforeEach(() => {
        cy.visit('https://uiredevelopment.volopa.com/')
        cy.get('#username').type('qwerty_admin_1')
        cy.get('#password').type('testTest1')
        cy.get('.ant-btn').click()
        cy.viewport(1440,1000)
    })
    it('TC_FW_001 -Validate the clicking on "fund wallet" from header navigate the user to "fund your company wallet page"', function(){
        fundWallet.goTOFundWalletPage() 
    })
    it('TC_FW_002 - Validate that the "company wallet balance" table is displayed on fund your company wallet page', function(){
        fundWallet.goTOFundWalletPage()
        fundWallet.validateCompanyWalletBalance()
        
    })
    it('TC_FW_003 - validate All content on the Fund Wallet page', function(){
        fundWallet.goTOFundWalletPage()
        fundWallet.validateAllContent()
    })
    it('TC_FW_004 - validate that clicking on the View allfrom the Company wallaet Balance display all currencies', function(){
        fundWallet.goTOFundWalletPage()
        fundWallet.viewAllCurrencies()
    })
    xit('TC_FW_005 - validate that the user is able to fund the company wallet with "euro" as easy transfer', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.validate_Fund_Wallet('EUR{enter}')
    })
    it('TC_FW_006 - validate that the user is able to fund the company wallet with "GBP" as easy transfer', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.validate_Fund_Wallet('GBP{enter}')
    })
    it('TC_FW_007 - validate that the user is able to fund the company wallet with "euro" as manual push fund', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.fund_manual_push('EUR{enter}')
    })
    it('TC_FW_008 - validate that the user is able to fund the company wallet with "GBP" as manual push fund', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.fund_manual_pushGBP()
    })
    it('TC_FW_009 - validate that the user is able to fund the company wallet with "USD" as manual push fund', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.fund_manual_push('USD{enter}')
    })
    it('TC_FW_010 - Validate that user cant fund the wallet if input wrong password on confirmation pop-up', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.fund_manual_pushWorngPass()
    })
})