export class FundWallet{
    goToFundWalletPage(){
        cy.get('[data-testid="container"] > .m-t-10').click()
        cy.get('.ant-col-24 > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)').click()
        cy.get('.ant-col-xs-21 > .fs-18px').should('contain.text','Fund Wallet')
    }
}