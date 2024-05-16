const variable1= require('../PageElements/PaymentsDashboard.json')
const variable= require('../PageElements/WalletDashboard.json')

export class PaymentsDashboard {
    clearCache(){
        sessionStorage.clear()
        cy.clearAllCookies({ log: true })
        cy.clearAllLocalStorage('your item', { log: true })
        cy.clearAllSessionStorage()
    }
    goToPaymentsDashborad(){
        cy.get(variable1.paymentsDashboardLocators.menuBtn).should('be.visible').click()
        cy.get(variable1.paymentsDashboardLocators.paymentsDashboardBtn).should('be.visible').click()
        cy.get(variable1.paymentsDashboardLocators.paymentsDashbordHeading).should('contain.text','Payments Dashboard')
    }
    validateCardtotalBalance(){
        cy.wait(9000)
        cy.get(variable.walletDashboardLocators.totalCompanyBalanceValue).eq(0).then((value1)=>{
         let Total=value1.text().trim()
        Total = Total.replace(/,/g, '').replace("€", "").replace(/&nbsp;/g, '');
        cy.log(Total)
       let wbalance, cbalance
        cy.wait(2000)
        cy.get(variable.walletDashboardLocators.walletBalanceValue).eq(1).then((ele)=>{
         wbalance= ele.text().trim()
         wbalance = wbalance.replace(/,/g, '').replace("€", "");
         cy.log(wbalance)
         cy.wait(2000)
         cy.get(variable.walletDashboardLocators.cardsBalanceValue).then((ele1)=>{
           cy.log(ele1)
           cbalance=ele1.text().trim()
           cbalance = cbalance.replace(/,/g, '').replace("€", "");
           cy.log(cbalance)
           const  value =(parseFloat(wbalance)+parseFloat(cbalance)).toFixed(2);
           cy.log('Total value:', value);
           cy.log(Total)
           cy.wrap(parseFloat(value)).should('eq', parseFloat(Total));
        })
        })
        })
    }
    goToAddRecipient(){
        cy.get(variable1.paymentsDashboardLocators.AddARecipient).click()
        cy.get(variable1.paymentsDashboardLocators.recipientListPageHeading).should('contain.text','Recipient List')
    }
    goToNewPayment(){
        cy.get(variable1.paymentsDashboardLocators.newPayment).click()
        
    }
}