const variable1= require('../PageElements/WalletDashboard.json')
//const variable = require('../PageElements/ConvertBalance.json')
export class WalletDashboard {
    validateAllContentOnDashbordPage(){
        cy.get(variable1.walletDashboardLocators.totalCompanyBalance).should('contain.text','Total Company Balance')
        cy.get(variable1.walletDashboardLocators.walletBalance).should('contain.text','Wallet Balance')
        cy.get(variable1.walletDashboardLocators.cardsBalance).should('contain.text','Cards Balance')
        cy.get(variable1.walletDashboardLocators.convertBalances).should('contain.text','Convert Balances')
        cy.get(variable1.walletDashboardLocators.fundCard).eq(1).should('contain.text','Fund Card')
        cy.get(variable1.walletDashboardLocators.fundWallet).eq(2).should('contain.text','Fund Wallet')
        cy.get(variable1.walletDashboardLocators.RecentActivity).should('contain.text','Recent Activity - ')
        cy.get(variable1.walletDashboardLocators.walletBreakdown).should('contain.text','Wallet Breakdown')
        cy.get(variable1.walletDashboardLocators.rateChecker).should('contain.text','Rate Checker')
        cy.get(variable1.walletDashboardLocators.recentFundingHistory).should('contain.text','Recent Funding History')
    }
    validateCardtotalBalance(){
        cy.wait(9000)
        cy.get(variable1.walletDashboardLocators.totalCompanyBalanceValue).eq(0).then((value1)=>{
         let Total=value1.text().trim()
        Total = Total.replace(/,/g, '').replace("€", "").replace(/&nbsp;/g, '');
        cy.log(Total)
       let wbalance, cbalance
        cy.wait(2000)
        cy.get(variable1.walletDashboardLocators.walletBalanceValue).eq(1).then((ele)=>{
         wbalance= ele.text().trim()
         wbalance = wbalance.replace(/,/g, '').replace("€", "");
         cy.log(wbalance)
         cy.wait(2000)
         cy.get(variable1.walletDashboardLocators.cardsBalanceValue).then((ele1)=>{
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
    clickOnCardBalanceAndValidate(){
        cy.get(variable1.walletDashboardLocators.cardsBalance).click()
        cy.get(variable1.walletDashboardLocators.cardDashboard).should('contain.text','Cards Dashboard')
    }
    validateRateChecker(){
        cy.get(variable1.walletDashboardLocators.rateChecker).should('contain','Rate Checker')
        cy.get(variable1.walletDashboardLocators.convertTo).type('HKD{enter}')
        cy.get(variable1.walletDashboardLocators.convertFrom).type('GBP{enter}')
        cy.get(variable1.walletDashboardLocators.convertFromValue).type(2)
        cy.get(variable1.walletDashboardLocators.convertBtn).should('be.visible').click({force:true})
        //cy.url().should('include','convert-balances')
        cy.get("button[type='submit'] span").should('be.visible').click()
        cy.wait(3000)
        this.Verify_Convertion_Comleted()
    }
    Verify_Convertion_Comleted(){
        cy.get(variable1.walletDashboardLocators.convertBtn).click()
        cy.wait(4000)
        cy.get(variable1.walletDashboardLocators.assertion1).should('have.text',"Conversion Complete")
          cy.wait(3000)
          //assertion to check the amount on conversion complete popup and recent activity are same
          let c1;
          let c2;
          cy.get(variable1.walletDashboardLocators.value1).invoke('val').then((text1)=>{
               c1=text1.trim()
              cy.log('Value1:',c1);
          })
      
          cy.get(variable1.walletDashboardLocators.value2).invoke('val').then((text2)=>{
               c2=text2.trim()
              cy.log('Value2:',c2);
           }).then(()=>{
              cy.wait(3000)
          cy.get(variable1.walletDashboardLocators.dashboard).click()
          cy.wait(5000)
          cy.get(variable1.walletDashboardLocators.istrecent).click()
          cy.get(variable1.walletDashboardLocators.Valuee1).invoke('text').should('contain',c1)
          cy.get(variable1.walletDashboardLocators.Valuee2).invoke('text').should('contain',c2)
        })
    }
    validateMarkAsRead(){
        cy.get(variable1.walletDashboardLocators.markAsRead).click()
        cy.log('this step is just to avoid failure')
        cy.get(variable1.walletDashboardLocators.noRecentActivities).should('contain.text','No Recent Activities')
    }
    clickOnShowAll(){
        cy.get(variable1.walletDashboardLocators.showAllBtn).click()
        cy.wait(3000)
        cy.get(variable1.walletDashboardLocators.showAllBtn).click()
    }
    navigationChecking(){
        cy.get(variable1.walletDashboardLocators.convertBalances).click()
        cy.get(variable1.walletDashboardLocators.convertBalancesPage).should('contain.text','Convert Balances')
        cy.get(variable1.walletDashboardLocators.walletDashboard).click()
        cy.get(variable1.walletDashboardLocators.fundCard).eq(1).click()
        cy.get(variable1.walletDashboardLocators.fundCardSelection).should('contain.text','Fund Card Selection')
        cy.get(variable1.walletDashboardLocators.crossBtn).click()
        cy.get(variable1.walletDashboardLocators.fundWallet).eq(2).click()
        cy.get(variable1.walletDashboardLocators.fundWalletPage).should('contain.text','Fund Wallet')
    }
}