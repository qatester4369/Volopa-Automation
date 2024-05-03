/// <reference types= "Cypress" />

import { BulkCardControll } from "../PageObject/BulkCardControll"
import { SigninPage} from "../PageObject/PageAction/SigninPage"

const BulkCardConroll = new BulkCardControll
const Signin = new SigninPage

describe('Wallet Section ',function(){

    beforeEach(()=>{
        cy.visit('/')
        Signin.Login('alexceaki+0141@gmail.com')
         cy.viewport(1440,1000)
    })
    it('TC_BCC-001 Validate that clicking on "bulk card control" from header navigate the user to bulk card control page',()=>{
        BulkCardConroll.goToBulkCardControllpage()
    })
    it('TC_BCC-002 Validate that search functionality is working fine on bulk card control page',()=>{
        BulkCardConroll.goToBulkCardControllpage()
        cy.get('.ant-input').type('Mrs. Carmen Ambassador')
    })
    it('TC_BCC-003 Validate that the pagination is working fine on bulk card control page for all tabs',()=>{
        BulkCardConroll.goToBulkCardControllpage()
        cy.get(':nth-child(1) > .ant-pagination-next > .ant-pagination-item-link').click()
        cy.wait(2000)
        cy.get(':nth-child(1) > .ant-pagination-prev > .ant-pagination-item-link').click()
    })
    it('TC_BCC-004 Validate the pagination filters work as intended',()=>{
        BulkCardConroll.goToBulkCardControllpage()
        cy.get(':nth-child(1) > .ant-pagination-options > .ant-select > .ant-select-selector').click()
    })
    it('TC_BCC-005 Validate that clicking on "select all" radio button selects all the cards',()=>{
        BulkCardConroll.goToBulkCardControllpage()
        cy.get(':nth-child(2) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click()
    })
    it('TC_BCC-006 Validate that the user is able to add the daily limits on the card, if the card has no limits',()=>{
        BulkCardConroll.goToBulkCardControllpage()
        cy.get('[data-row-key="2294"] > :nth-child(1) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click()
        cy.get(':nth-child(1) > .ant-space > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('100')
        cy.get('.ant-row-space-between > :nth-child(1) > .ant-space > :nth-child(3) > .ant-btn').click()
        cy.wait(1000)
        cy.get('[data-row-key="2294"] > :nth-child(1) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click()
        cy.get(':nth-child(2) > .ant-space > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('100')
        cy.get(':nth-child(2) > .ant-space > :nth-child(3) > .ant-btn').click()
    })
    it('TC_BCC-007 Verify that the updated limits overwrite the existing limits, if the card has already limits for both atm and POS',()=>{
        BulkCardConroll.goToBulkCardControllpage()
        cy.get('[data-row-key="2294"] > :nth-child(1) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click()
        cy.get(':nth-child(1) > .ant-space > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('100')
        cy.get('.ant-row-space-between > :nth-child(1) > .ant-space > :nth-child(3) > .ant-btn').click()
        cy.wait(1000)
        cy.get('[data-row-key="2294"] > :nth-child(1) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click()
        cy.get(':nth-child(2) > .ant-space > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('100')
        cy.get(':nth-child(2) > .ant-space > :nth-child(3) > .ant-btn').click()
    })
    it('TC_BCC-008 Verify that the "Remove Atm limit" and "Remove Pos limit" are functional and work as intended',()=>{
        BulkCardConroll.goToBulkCardControllpage()
        cy.get('[data-row-key="2294"] > [style="text-align: right;"] > .ant-space > [style=""] > .ant-btn').click()
        cy.wait(2000)
        cy.get('[data-row-key="2294"] > [style="text-align: right;"] > .ant-space > :nth-child(2) > .ant-btn').click()
    })
    it('TC_BCC-009 Verify that the "Remove Atm limit" and "Remove Pos limit" buttons are functional if the card has no limit for both',()=>{
        BulkCardConroll.goToBulkCardControllpage()
    })
    it('TC_BCC-010 verify that the" remove Atm limit" button is enabled and working, if the card has only ATM limit',()=>{
        BulkCardConroll.goToBulkCardControllpage()
    })

})