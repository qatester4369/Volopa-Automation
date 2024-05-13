const variable= require('../PageElements/FundingHistory.json')
export class FundingHistory{
    goToFundingHistoryPage(){
        cy.get(variable.fundingHistoryLocators.fundingHistory).click()
        cy.get(variable.fundingHistoryLocators.mainHeading).should('contain','Your Transaction History')
        cy.wait(3000)
    }
    validateSearchField(search){
        cy.get(variable.fundingHistoryLocators.searchField).type(search)
    }
}