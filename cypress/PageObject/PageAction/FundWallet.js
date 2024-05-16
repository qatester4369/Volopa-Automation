const variable= require('../PageElements/FundWallet.json')

export class FundWallet {
    goTOFundWalletPage(){
        cy.get(variable.fundWalletLocators.fundWallet).click()
        cy.get(variable.fundWalletLocators.fundWalletNavbar).should('contain.text','Fund Wallet')
    }
    validateAllContent(){
        cy.get(variable.fundWalletLocators.fundWalletHeading).should('contain.text','Fund Your Company Wallet')
        cy.get(variable.fundWalletLocators.fundWalletByAmount).should('contain.text','Fund Wallet By Amount')
        cy.get(variable.fundWalletLocators.walletBalance).should('contain.text','Company Wallet Balance')
    }
    viewAllCurrencies(){
        cy.wait(3000)
        cy.get(variable.fundWalletLocators.viewAllBtn).click()
        cy.wait(1000)
        cy.get(variable.fundWalletLocators.viewAllBtn).click()
    }
    validate_Fund_Wallet(funding){
        let amount1,amount;
          cy.get(variable.fundWalletLocators.fundWallet).click()
          cy.get(variable.fundWalletLocators.fundWalletHeading).should('have.text','Fund Your Company Wallet')
          cy.get(variable.fundWalletLocators.calculatorheading).should('have.text','Fund Wallet By Amount')
          cy.get(variable.fundWalletLocators.currency1).type(funding)
          cy.get(variable.fundWalletLocators.amount1).type(2)
          //for validate at history page 
          cy.get(variable.fundWalletLocators.amount1).invoke('text').then(text=>{
            cy.wrap(text).as('Amount')
            
          })
         
          cy.get(variable.fundWalletLocators.description1).type('script testing').wait(2000)
          cy.get(variable.fundWalletLocators.confirmbutton).should('be.visible').click({force:true})
          cy.wait(3000)
          cy.get(variable.fundWalletLocators.popupheading).should('contain','Fund via Easy Transfer (Open Banking)')
          cy.get(variable.fundWalletLocators.popupconfirmxpath).click()
          cy.wait(10000)
          cy.get('.title').should('have.text','Choose your bank')
          cy.get("input[placeholder='Search all 63 banks']").type('Modelo Sandbox')
          cy.get('.hover-effect').click()
        
          cy.get(".pb-2.currency-style").invoke('text').then((ele)=>{
            amount1=ele.trim()
            amount1= amount1.replace(/£/g,'')
            cy.log('amount', amount1)
            cy.wrap(amount1).as('Amount')
          })
          cy.wait(2000)
          cy.get('.button-primary.mt-4.mb-2').click()
          cy.get('.title').should('contain','Approve your payment')
          cy.get("p[class='link font-size-16 mt-4'] strong").click()     
            cy.get('.ozone-heading-1.text-ozone-primary').should('have.text','Model Bank')
            cy.get('.mt-6.ozone-heading-3').should('have.text','Please login to proceed')
            cy.get("input[placeholder='username']").type('mits')
            cy.get('#passwordField').type('mits')
            cy.get('#loginButton').click({force:true})
            cy.get('.justify-start.ozone-ais-heading-1.text-ozone-primary').should('have.text','Single Domestic Payment Consents (PIS)')
            cy.get("#radio-10000109010102").click()
            cy.get('#confirmButton').click({force:true})
            cy.get('[class="ant-typography muli semi-bold fs-24px purple"]').should('contain.text','Funds could take up to 2 hours to be posted.')
            cy.get(':nth-child(2) > .ant-btn').click()
            cy.get(variable.fundWalletLocators.validationamoungt).click()
            cy.get('@Amount').then(Amount=>{
            cy.get('.ant-typography.m-t-10.m-l-10.medium.bold.fs-18px').invoke('text').then(ele1=>{
              let val= ele1.trim()
              cy.wrap(val).should('contain','GBP')
              val=val.replace(/GBP/g,'')
              cy.wrap(parseFloat(Amount)).should('eq',parseFloat(val))
              
            })
      })
    }
    fund_manual_push(funding1){
        cy.get(variable.fundWalletLocators.fundWallet).click()
        cy.get(variable.fundWalletLocators.fundWalletHeading).should('have.text','Fund Your Company Wallet')
        cy.get(variable.fundWalletLocators.calculatorheading).should('have.text','Fund Wallet By Amount')
      
        //cy.get(variable.fundWalletLocators.currency1).click()
        cy.get(variable.fundWalletLocators.currency1).type(funding1)
        cy.get('.ant-input-number-input-wrap').type(2)
        cy.get('.ant-col-xs-24 > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-item').click()
        cy.contains('Manual Push Fund').click()
        cy.get(variable.fundWalletLocators.description1).type('script testing')
        cy.get(variable.fundWalletLocators.confirmbutton).should('be.visible').click()
        cy.wait(5000)
        cy.get("div[class='ant-col'] span[class='ant-typography medium fs-18px dark-green']")
        .should('have.text','Funding Confirmation')
        cy.get("div[class='ant-col ant-col-16'] span[class='ant-typography muli light fs-18px dark-green']").invoke('text').then(text=>{
          text.trim()
          text=text.replace(/USD/g,'')
          cy.log(text)
          cy.wrap(text).as('manualamount')
        })
        cy.get('#password').type('testTest1')
        cy.get("button[type='submit'] span").click({force:true}).wait(2000)
        cy.get(".ant-typography.ant-typography-success.medium.fs-18px.center-align-text").should('have.text','Pending Funds')
        cy.get("div[class='ant-space ant-space-horizontal ant-space-align-center'] div:nth-child(1) button:nth-child(1)").click()
        cy.wait(3000)
        cy.get("body > div:nth-child(2) > section:nth-child(1) > header:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4)").click()
        cy.get('.ant-typography.medium.dark-green.fs-28px').should('have.text','Your Transaction History')
        cy.get(variable.fundWalletLocators.validationamoungt).click()
        cy.get('@manualamount').then(manualamount=>{
          cy.get('.ant-typography.m-t-10.m-l-10.medium.bold.fs-18px').invoke('text').then(ele2=>{
          let val=ele2.trim()
          cy.wrap(val).should('contain',val)
          //val=val.replace(/USD/g,'')
          //cy.wrap(parseFloat(manualamount)).should('eq',parseFloat(val))
        })
        })
    }
    fund_manual_pushGBP(){
      cy.get(variable.fundWalletLocators.fundWallet).click()
      cy.get(variable.fundWalletLocators.fundWalletHeading).should('have.text','Fund Your Company Wallet')
      cy.get(variable.fundWalletLocators.calculatorheading).should('have.text','Fund Wallet By Amount')
    
      //cy.get(variable.fundWalletLocators.currency1).click()
      cy.get(variable.fundWalletLocators.currency1).type('GBP{enter}')
      cy.get('.ant-input-number-input-wrap').type(2)
      cy.get('.ant-col-xs-24 > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-item').click()
      cy.contains('Manual Push Fund').click()
      cy.get(variable.fundWalletLocators.description1).type('script testing')
      cy.get(variable.fundWalletLocators.confirmbutton).should('be.visible').click()
      cy.wait(5000)
      cy.get("div[class='ant-col'] span[class='ant-typography medium fs-18px dark-green']")
      .should('have.text','Funding Confirmation')
      cy.get("div[class='ant-col ant-col-16'] span[class='ant-typography muli light fs-18px dark-green']").invoke('text').then(text=>{
        text.trim()
        text=text.replace(/USD/g,'')
        cy.log(text)
        cy.wrap(text).as('manualamount')
      })
      cy.get('#password').type('testTest1')
      cy.get("button[type='submit'] span").click({force:true}).wait(2000)
    }
    fund_manual_pushWorngPass(){
      cy.get(variable.fundWalletLocators.fundWallet).click()
      cy.get(variable.fundWalletLocators.fundWalletHeading).should('have.text','Fund Your Company Wallet')
      cy.get(variable.fundWalletLocators.calculatorheading).should('have.text','Fund Wallet By Amount')
    
      //cy.get(variable.fundWalletLocators.currency1).click()
      cy.get(variable.fundWalletLocators.currency1).type('GBP{enter}')
      cy.get('.ant-input-number-input-wrap').type(2)
      cy.get('.ant-col-xs-24 > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-item').click()
      cy.contains('Manual Push Fund').click()
      cy.get(variable.fundWalletLocators.description1).type('script testing')
      cy.get(variable.fundWalletLocators.confirmbutton).should('be.visible').click()
      cy.wait(5000)
      cy.get("div[class='ant-col'] span[class='ant-typography medium fs-18px dark-green']")
      .should('have.text','Funding Confirmation')
      cy.get("div[class='ant-col ant-col-16'] span[class='ant-typography muli light fs-18px dark-green']").invoke('text').then(text=>{
        text.trim()
        text=text.replace(/USD/g,'')
        cy.log(text)
        cy.wrap(text).as('manualamount')
      })
      cy.get('#password').type('testTest')
      cy.get("button[type='submit'] span").click({force:true}).wait(2000)
      cy.get('.ant-notification-notice').should('exist')
    }
    validateCompanyWalletBalance(){
      cy.get(variable.fundWalletLocators.walletBalance).should('contain.text','Company Wallet Balance')
      cy.get(variable.fundWalletLocators.rowInCompanyWalletBalance).should('be.visible')
    }
}