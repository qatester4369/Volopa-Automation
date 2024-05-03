/// <reference types = "Cypress"/>

import { WalletDashboard } from "../PageObject/WalletDashboard"

const walletDashboard = new WalletDashboard

describe('WalletDashboard TS_003 ',function(){
    
    beforeEach(() => {
        cy.visit('https://uiredevelopment.volopa.com/')
        cy.get('#username').type('alexceaki+0141@gmail.com')
        cy.get('#password').type('testTest1')
        cy.get('.ant-btn').click()
    })

    it ('TC_WD_001 - validate All content on the dashboard page', function(){
        walletDashboard.validateAllContentOnDashbordPage()
    })
    it ('TC_WD_002 - Validate that the the total company wallet balance is equal to the sum of wallet balance + card balance', function(){
        walletDashboard.validateCardtotalBalance()
    })
    it ('TC_CD_003 -Valiadte that the forward and backward arrow icons are functional on recent activity', function(){
        cy.wait(6000)
        cy.get('.ant-space > :nth-child(2) > a').click({force:true})
        cy.wait(2000)
        cy.get('[style=""] > a').click({force:true})
    })
    it ('TC_WD_004 - Valiadte that clicking on "Show all" from Wallet Breakdown Show all data', function(){
        cy.get("button[class='ant-btn ant-btn-link medium fs-18px'] span").click()
        cy.wait(3000)
        cy.get("button[class='ant-btn ant-btn-link medium fs-18px'] span").click()
    })
    it ('TC_WD_005 - Valiadte that clicking on "Veiw all" from Recent Funding history nevigates to the funding history page', function(){
        cy.get("button[class='ant-btn ant-btn-link medium fs-18px pointer'] span").click()
        cy.wait(3000)
        cy.get('.ant-col-xs-21 > .fs-18px').should('contain.text','Funding History')
    })
    it ('TC_WD_006 - Valiadte that clicking on Convert Balance Card nevigates to the Convert Balances Page', function(){
        cy.get("div[class='slick-slide slick-active slick-current'] div div div[class='ant-card-body']").click()
        cy.wait(3000)
        cy.get('.ant-col-xs-21 > .fs-18px').should('contain.text','Convert Balances')
    })
    it ('TC_WD_007 - Valiadte that clicking on Fund Card nevigates to the Fund Card Selection page', function(){
        cy.get('[data-index="1"] > :nth-child(1) > [tabindex="-1"] > .m-t-10 > .ant-card > .ant-card-body').click()
        cy.wait(3000)
        cy.get('[data-testid="container"] > .ant-card-body > :nth-child(1) > .ant-col').should('contain.text','Fund Card Selection')
    })
    it ('TC_WD_008 - Valiadte that clicking on Fund Wallet nevigates to the Fund Card Selection page', function(){
        cy.get('[data-index="2"] > :nth-child(1) > [tabindex="-1"] > .m-t-10 > .ant-card > .ant-card-body').click()
        cy.wait(3000)
        cy.get('.ant-col-xs-21 > .fs-18px').should('contain.text','Fund Wallet')
    })
})