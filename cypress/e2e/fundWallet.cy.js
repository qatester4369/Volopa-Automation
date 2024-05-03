/// <reference types = "Cypress"/>

import { FundWallet } from "../PageObject/FundWallet"

const fundWallet = new FundWallet

describe('FundWallet TS_003 ',function(){
    
    beforeEach(() => {
        cy.visit('https://uiredevelopment.volopa.com/')
        cy.get('#username').type('alexceaki+0141@gmail.com')
        cy.get('#password').type('testTest1')
        cy.get('.ant-btn').click()
    })
    it ('TC_WD_001 - It should navigate the user to fund your company wallet page', function(){
        fundWallet.goToFundWalletPage()
    })
    it ('TC_WD_002 - validate All content on the Fund Wallet page', function(){
        fundWallet.goToFundWalletPage()
        cy.get('.ant-typography.medium.dark-green.fs-28px').should('contain.text','Fund Your Company Wallet')
        cy.get('.ant-col-md-12 > .ant-typography').should('contain.text','Fund Wallet By Amount')
        cy.get('.ant-col-sm-24 > .ant-typography.medium').should('contain.text','Company Wallet Balance')
    })
    it ('TC_WD_003 - validate That on clicking on the View all currency from the Company wallaet Balance show all currency', function(){
        fundWallet.goToFundWalletPage()
        cy.wait(3000)
        cy.get('.m-t-10 > .ant-col > .ant-btn > span').click()
        cy.wait(1000)
        cy.get('.m-t-10 > .ant-col > .ant-btn > span').click()
    })
})