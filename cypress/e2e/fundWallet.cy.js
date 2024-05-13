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
    it('TC_WD_001 - It should navigate the user to fund your company wallet page', function(){
        fundWallet.goTOFundWalletPage() 
    })
    it ('TC_WD_002 - validate All content on the Fund Wallet page', function(){
        fundWallet.goTOFundWalletPage()
        fundWallet.validateAllContent()
    })
    it ('TC_WD_003 - validate That on clicking on the View all currency from the Company wallaet Balance show all currency', function(){
        fundWallet.goTOFundWalletPage()
        fundWallet.viewAllCurrencies()
    })
    it('TC_WD_004 - validate that the user is able to fund the company wallet with "euro" with easy transfer', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.validate_Fund_Wallet('EUR{enter}')
    })
    it('TC_WD_005 - validate that the user is able to fund the company wallet with "GBP" with easy transfer', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.validate_Fund_Wallet('GBP{enter}')
    })
    it('TC_WD_006 - validate that the user is able to fund the company wallet with "euro" with manual push fund', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.fund_manual_push('EUR{enter}')
    })
    it('TC_WD_007 - validate that the user is able to fund the company wallet with "GBP" with manual push fund', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.fund_manual_pushGBP()
    })
    it('TC_WD_008 - validate that the user is able to fund the company wallet with "USD" with manual push fund', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.fund_manual_push('USD{enter}')
    })
    it('TC_WD_009 - Validate that user cant fund the wallet if input wrong password on confirmation pop-up', function(){
        fundWallet.goTOFundWalletPage() 
        fundWallet.fund_manual_pushWorngPass()
    })
})