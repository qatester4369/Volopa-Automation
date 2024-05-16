/// <reference types = "Cypress"/>

import { PaymentsDashboard } from "../PageObject/PageAction/paymentsDashboard"

const paymentspage = new PaymentsDashboard

describe('Payments Dashboard',function(){
    
    beforeEach(() => {
        cy.visit('https://uiredevelopment.volopa.com/')
        paymentspage.clearCache()
        cy.get('#username').type('qwerty_admin_1')
        cy.get('#password').type('testTest1')
        cy.get('.ant-btn').click()
        cy.viewport(1440,1000)
    })

    it('TC_PD_001 - Verify that user landed on the Payments Dashboard page', function(){
        paymentspage.goToPaymentsDashborad()
    })
    it('TC_PD_002 - Validate that the the total company wallet balance is equal to the sum of wallet balance + card balance', function(){
        paymentspage.goToPaymentsDashborad()
        paymentspage.validateCardtotalBalance()
    })
    it('TC_PD_003 - Verify that user is redirecting to Recipient List screen', function(){
        paymentspage.goToPaymentsDashborad()
        paymentspage.goToAddRecipient()
    })
    it.only('TC_PD_004 - Verify that user is redirecting to New Payment screen', function(){
        paymentspage.goToPaymentsDashborad()
        paymentspage.goToNewPayment()
    })
})