/// <reference types = "Cypress"/>

import { WalletDashboard } from "../PageObject/PageAction/WalletDashboard"

const walletpage = new WalletDashboard

describe('WalletDashboard',function(){
    
    beforeEach(() => {
        cy.visit('https://uiredevelopment.volopa.com/')
        cy.get('#username').type('qwerty_admin_1')
        cy.get('#password').type('testTest1')
        cy.get('.ant-btn').click()
        cy.viewport(1440,1000)
    })

    it('TC_WD_001 - validate All content on the dashboard page', function(){
        walletpage.validateAllContentOnDashbordPage()
    })
    it('TC_WD_002 - Validate "Total Companay Balance" on dashboard', function(){
        walletpage.validateCardtotalBalance()
    })
    xit('TC_WD_003 - Validate "Wallet balance" on wallet dashboard', function(){
        
    })
    it('TC_WD_004 - Validate that clicking on card balance naviagte the user to card section', function(){
        walletpage.clickOnCardBalanceAndValidate()
    })
    it('TC_WD_005 -Validate "Rate Checker"  from Wallet dashboard', function(){
        walletpage.validateRateChecker()
    })
    it('TC_WD_006 -validate that clicking on "Mark all as read" from recent activities marks all as read', function(){
        walletpage.validateMarkAsRead()
        walletpage.validateRateChecker()
    })
    it('TC_WD_007 -Validate that clicking on "show all" from wallet breakdown expands the table with more currencies', function(){
        walletpage.clickOnShowAll()
    })
    it('TC_WD_008 -Validate the user can repeat recent transactions as easy transfer from wallet dashboard', function(){
        
    })
    it('TC_WD_009 -Validate the user can repeat recent transactions as manual push funds from wallet dashboard', function(){
        
    })
    it('TC_WD_010 -Validate convert balance,fund card,fund wallet navigations from wallet dashboard', function(){
        walletpage.navigationChecking()
    })
})