const variable1= require('../PageElements/wallet.json')
const variable = require('../PageElements/ConvertBalance.json')
export class walletPageActions{

validate_Dashboard(){
  let value=0
cy.get(variable1.walletPageLocators.walletDashboard).should('have.text','Wallet Dashboard')
cy.get(variable1.walletPageLocators.TotalBAlance).should('have.text','Total Company Balance')
//getting and validate amount 
// cy.get('div[class="ant-col"] [class="ant-typography  bold fs-28px"]').eq('0').invoke('text').as('Totalamount')
// cy.get('@Totalamount').then((text)=>{
//   cy.log('Text of the element:', text);
// })
// cy.get('div[class="ant-col"] [class="ant-typography  bold fs-28px"]').eq(1).invoke('text').then(()=>{
//   const wbalance= text;
//   value+=wbalance;
// })
// cy.get('div[class="ant-col"] [class="ant-typography  bold fs-28px pointer"]').invoke('text').then(()=>{
//   const cbalance=text;
//   value += text;
// })
cy.get(variable1.walletPageLocators.W_Balance).should('have.text','Wallet Balance')
cy.get(variable1.walletPageLocators.C_Balance).should('have.text','Cards Balance')
cy.get(variable1.walletPageLocators.walletBreakDown).should('contain','Wallet Breakdown')
cy.get(variable1.walletPageLocators.istCurrency).should('be.visible')
cy.get(variable1.walletPageLocators.recentActivity).should('contain','Recent Activity')
cy.get(variable1.walletPageLocators.recentFundingHistory).should('contain','Recent Funding History')
cy.get(variable1.walletPageLocators.istRecentHistory).should('be.visible')
cy.get(variable1.walletPageLocators.viewAll_History).click({force:true})
cy.url().should('include','funding-history')
cy.go('back')
cy.get(variable1.walletPageLocators.rateChecker).should('contain','Rate Checker')
cy.get(variable1.walletPageLocators.convert_balance).should('be.visible')
cy.get(variable1.walletPageLocators.fundCard).should('be.visible')
//cy.get(variable1.walletPageLocators.fundWallet).should('be.visible')
}    
Validate_wallet_total_Balance(){
 // getting and validate amount 
 let Total
 cy.wait(3000)
cy.get("body > div:nth-child(2) > section:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)").then((value1)=>{
  
  let Total=value1.text().trim()
 Total = Total.replace(/,/g, '').replace("€", "").replace(/&nbsp;/g, '');
 cy.log(Total)

 //cy.wrap(Total).as('Totalamount')

let wbalance, cbalance
cy.wait(3000)
cy.get('div[class="ant-col"] [class="ant-typography  bold fs-28px"]').eq(1).then((ele)=>{
  wbalance= ele.text().trim()
  wbalance = wbalance.replace(/,/g, '').replace("€", "");
  cy.log(wbalance)
  
  cy.wait(2000)
  cy.get('div[class="ant-col"] [class="ant-typography  bold fs-28px pointer').then((ele1)=>{
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
validate_RateChecker_Calculator(){
  cy.get(variable1.walletPageLocators.rateChecker).should('contain','Rate Checker')
  cy.get(variable1.walletPageLocators.convertTo).type('HKD{enter}')
  cy.get(variable1.walletPageLocators.convertFrom).type('GBP{enter}')
  cy.get(variable1.walletPageLocators.convertFromValue).type(2)
  cy.get(variable1.walletPageLocators.convertBtn).should('be.visible').click({force:true})
  cy.url().should('include','convert-balances')
  cy.get("button[type='submit'] span").should('be.visible').click()
  cy.wait(3000)
  this.Verify_Convertion_Comleted()
}
//[data-index='2'] > :nth-child(1) > [tabindex='-1'] > .m-t-10 > .ant-card > .ant-card-body
//check total wallet balnace from convert balance from wallet dash board 
Total_Wallet_BalanceinEUR(){
  cy.get(variable1.walletPageLocators.convert_balance).click()
 // cy.get(variable.CompanyWalletBalance.Viewallcurrencies).click()
  let sum = 0;
        cy.wait(5000)
        // Get all elements matching the locator and iterate over them
        cy.get(variable.CompanyWalletBalance.Viewallcurrencies).click()
        cy.get('.ant-table-row td:nth-child(4)').each(($el) => {
            // Extract the text value from each element and convert it to a number
            const value = parseFloat($el.text());
            // Check if the extracted value is a valid number
            if (!isNaN(value)) {
                // Add the value to the sum
                sum += value;
            }
        }).then(() => {
            // Log the sum
            cy.log('Sum of values:', sum);
            // Assert the sum value or use it for further processing
            cy.get(variable.CompanyWalletBalance.TotalEURvalue).should('eq',parseFloat(sum))
        });
}
validate_Convert_Balances(){
    //click on convert balance on wallet dashboard
    cy.get(variable1.walletPageLocators.convert_balance).click()
    //to check the user is on convert balances page
    cy.url().should('include','convert-balances')
    cy.get(variable1.walletPageLocators.convert_balance_page).should('have.text','Convert Balances')
    //enter details
    cy.get(variable1.walletPageLocators.convertTo).type('GBP{enter}')
    cy.get(variable1.walletPageLocators.convertFrom).type('EUR{enter}')
    cy.get(variable1.walletPageLocators.convertFromValue).type(2)
    //to check convert button is enabled 
    cy.get(variable1.walletPageLocators.convertBtn).should('be.enabled')
    cy.get(variable1.walletPageLocators.convertBtn).click()
    cy.wait(10000)
    //after converting check whether the conversion is completed or not
    cy.get(variable1.walletPageLocators.assertion1).should('have.text',"Conversion Complete")
    cy.wait(4000)
    //assertion to check the amount on conversion complete popup and recent activity are same
    let c1;
    let c2;
    cy.get(variable1.walletPageLocators.value1).invoke('val').then((text1)=>{
         c1=text1.trim()
        cy.log('Value1:',c1);
    })

    cy.get(variable1.walletPageLocators.value2).invoke('val').then((text2)=>{
         c2=text2.trim()
        cy.log('Value2:',c2);
     }).then(()=>{
        cy.wait(5000)
    cy.get(variable1.walletPageLocators.dashboard).click()
    cy.wait(5000)
    cy.get(variable1.walletPageLocators.istrecent).click({force:true})
    cy.get(variable1.walletPageLocators.Valuee1).invoke('text').should('contain',c1)
    cy.get(variable1.walletPageLocators.Valuee2).invoke('text').should('contain',c2)
      
})
}
//same code in uper function
Verify_Convertion_Comleted(){
  cy.get(variable1.walletPageLocators.assertion1).should('have.text',"Conversion Complete")
    cy.wait(4000)
    //assertion to check the amount on conversion complete popup and recent activity are same
    let c1;
    let c2;
    cy.get(variable1.walletPageLocators.value1).invoke('val').then((text1)=>{
         c1=text1.trim()
        cy.log('Value1:',c1);
    })

    cy.get(variable1.walletPageLocators.value2).invoke('val').then((text2)=>{
         c2=text2.trim()
        cy.log('Value2:',c2);
     }).then(()=>{
        cy.wait(5000)
    cy.get(variable1.walletPageLocators.dashboard).click()
    cy.wait(5000)
    cy.get(variable1.walletPageLocators.istrecent).click()
    cy.get(variable1.walletPageLocators.Valuee1).invoke('text').should('contain',c1)
    cy.get(variable1.walletPageLocators.Valuee2).invoke('text').should('contain',c2)
})
}
//from wallet dashboard convert balance in any other curancy and validate insificent balance 
validate_Insificent_balance (){
  //click on convert balance on wallet dashboard
  cy.get(variable1.walletPageLocators.convert_balance).click()
  //to check the user is on convert balances page
  cy.url().should('include','convert-balances')
  cy.get(variable1.walletPageLocators.convert_balance_page).should('have.text','Convert Balances')
  //enter details
  cy.get(variable1.walletPageLocators.convertTo).type('GBP{enter}')
  cy.get(variable1.walletPageLocators.convertFrom).type('EUR{enter}')
  cy.get(variable1.walletPageLocators.convertFromValue).type(1000)
  //to check convert button is enabled 
  cy.get(variable1.walletPageLocators.convertBtn).should('be.enabled')
  cy.get(variable1.walletPageLocators.convertBtn).click()
  cy.wait(10000)
  //after converting check whether the conversion is completed or not
  cy.get(variable1.walletPageLocators.assertion1).should('have.text',"Insufficient funds, please check your balance.")
  cy.wait(4000)
  //assertion to check the amount on conversion complete popup and recent activity are same
  let c1;
  let c2;
  cy.get(variable1.walletPageLocators.value1).invoke('val').then((text1)=>{
       c1=text1.trim()
      cy.log('Value1:',c1);
  })

  cy.get(variable1.walletPageLocators.value2).invoke('val').then((text2)=>{
       c2=text2.trim()
      cy.log('Value2:',c2);
   }).then(()=>{
      cy.wait(5000)
  cy.get(variable1.walletPageLocators.dashboard).click()
    
})
}
validate_Fund_Wallet(){
  let amount1,amount;
    cy.get(variable1.fundwalletLocators.fundWallet).click()
    cy.get(variable1.fundwalletLocators.fundwalletpageheading).should('have.text','Fund Your Company Wallet')
    cy.get(variable1.fundwalletLocators.calculatorheading).should('have.text','Fund Wallet By Amount')
    cy.get(variable1.fundwalletLocators.currency1).type('GBP{enter}')
    cy.get(variable1.fundwalletLocators.amount1).type(100)
    //for validate at history page 
    cy.get(variable1.fundwalletLocators.amount1).invoke('text').then(text=>{
      cy.wrap(text).as('Amount')
      
    })
   
    cy.get(variable1.fundwalletLocators.description1).type('script testing').wait(2000)
    cy.get(variable1.fundwalletLocators.confirmbutton).should('be.visible').click({force:true})
    cy.wait(3000)
    cy.get(variable1.fundwalletLocators.popupheading).should('contain','Fund via Easy Transfer (Open Banking)')
    cy.get(variable1.fundwalletLocators.popupconfirmxpath).click({force:true})
    cy.wait(10000)
    cy.get('.title.w-100').should('have.text','Choose your bank')
    cy.get("input[placeholder='Search all 63 banks']").type('Modelo Sandbox')
    cy.get('[class="border-none institution-list-images-div clickable institution-card-alt-styles w-sm-100"]').should('be.visible').click({force:true})
  
    cy.get(".pb-2.currency-style").invoke('text').then((ele)=>{
      amount1=ele.trim()
      amount1= amount1.replace(/£/g,'')
      cy.log('amount', amount1)
      cy.wrap(amount1).as('Amount')
    })
    cy.wait(2000)
    cy.get('.button-primary.mt-4.mb-2').click()
    cy.get('.title.w-100').should('contain','Approve your payment')
    cy.get("p[class='link font-size-16 mt-4'] strong").click()     
      cy.get('.ozone-heading-1.text-ozone-primary').should('have.text','Model Bank')
      cy.get('.mt-6.ozone-heading-3').should('have.text','Please login to proceed')
      cy.get("input[placeholder='username']").type('mits')
      cy.get('#passwordField').type('mits')
      cy.get('#loginButton').click({force:true})
      cy.get('.justify-start.ozone-ais-heading-1.text-ozone-primary').should('have.text','Single Domestic Payment Consents (PIS)')
      cy.get("#radio-10000109010102").click()
      cy.get('#confirmButton').click({force:true})
      cy.get("main[class='ant-layout-content content'] div:nth-child(2) button:nth-child(1) span:nth-child(1)").click()
      cy.get(variable1.fundwalletLocators.validationamoungt).click()
      cy.get('@Amount').then(Amount=>{
      cy.get('.ant-typography.m-t-10.m-l-10.medium.bold.fs-18px').invoke('text').then(ele1=>{
        let val= ele1.trim()
        cy.wrap(val).should('contain','GBP')
        val=val.replace(/GBP/g,'')
        cy.wrap(parseFloat(Amount)).should('eq',parseFloat(val))
        
      })
    })
}

fund_manual_push(){
  cy.get(variable1.fundwalletLocators.fundWallet).click()
  cy.get(variable1.fundwalletLocators.fundwalletpageheading).should('have.text','Fund Your Company Wallet')
  cy.get(variable1.fundwalletLocators.calculatorheading).should('have.text','Fund Wallet By Amount')

  cy.get(variable1.fundwalletLocators.currency1).click()
  cy.get('.rc-virtual-list-holder-inner [class*="ant-select-item ant-select-item-option p-l-10"]:nth-child(3)')
    .click()
  cy.get('.ant-input-number-input-wrap').type(100)
  cy.get(variable1.fundwalletLocators.description1).type('script testing')
  cy.get(variable1.fundwalletLocators.confirmbutton).should('be.visible').click()
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
  cy.get(variable1.fundwalletLocators.validationamoungt).click()
  cy.get('@manualamount').then(manualamount=>{
    cy.get('.ant-typography.m-t-10.m-l-10.medium.bold.fs-18px').invoke('text').then(ele2=>{
    let val=ele2.trim()
    cy.wrap(val).should('contain','USD')
    val=val.replace(/USD/g,'')
    cy.wrap(parseFloat(val)).should('eq',parseFloat(manualamount))
  })
})
}
unhappySearch(){
    cy.get(variable1.walletPageLocators.fundingHistory).click()
    cy.get(variable1.walletPageLocators.fundingHistory1).click()
    cy.get(variable1.walletPageLocators.fundingHistoryPage).should('have.text','Your Transaction History')
    cy.get(variable1.walletPageLocators.searchButton).click()
    cy.log('Enter input to search something')
}
happySearch(){
    cy.get(variable1.walletPageLocators.fundingHistory).click()
    cy.get(variable1.walletPageLocators.fundingHistory1).click()
    cy.get(variable1.walletPageLocators.fundingHistoryPage).should('have.text','Your Transaction History')
    //assertion to check the admin colum text contains inputted text

    const search= 'alex';
    cy.get(variable1.walletPageLocators.searchInput).type(search)
    cy.get(variable1.walletPageLocators.searchButton).click()
    cy.wait(5000)
    //Iterate over each row based on the data-row-key attribute
    //if want to remove assertion use cy.get(variable1.walletPageLocators.transactionRow).should('exist')
    cy.get(variable1.walletPageLocators.transactionRow).each((transactionRow) => {
        const rowKey = transactionRow.attr('data-row-key');
        // Construct the selector for the admin column in the current row
        const adminColumnSelector = `[data-row-key="${rowKey}"]${variable1.walletPageLocators.adminColumn}`;
        cy.get(adminColumnSelector).then((adminColumn) => {
        const adminColumnText = adminColumn.text().trim();  
        // Assert that the admin name in each row contains the search term
        expect(adminColumnText).to.include(search);    
        });
        
    });
    // cy.get(variable1.walletPageLocators.nextPageButton).then(($nextPageButton) => {
    //   if ($nextPageButton.is(':visible')) {
    //     cy.log('Navigating to the next page');
    //     cy.get(variable1.walletPageLocators.pageSelector).click();
    //     this.happySearch();
    //   } else {
    //     cy.log('No more pages to validate');
    //   }
    // });
}
validatePagination(){
    cy.get(variable1.walletPageLocators.fundingHistory).click()
    cy.get(variable1.walletPageLocators.fundingHistory1).click()
    cy.get(variable1.walletPageLocators.fundingHistoryPage).should('have.text','Your Transaction History')

  // Start iterating from page number1
  function checkPagination(pageNumber) {
    cy.get(variable1.walletPageLocators.transactionRow).should('exist');

    // Navigate to the next page if it exists
    cy.get(variable1.walletPageLocators.nextPageButton).then((nextPageButton) => {
      if (nextPageButton.is(':enabled')) {
        // Click on the next page button
        cy.get(variable1.walletPageLocators.nextPageButton).click();
        cy.wait(4000)
        checkPagination(pageNumber + 1);
      }
    });
  }
  checkPagination(1);
}
validateAmountSorting() {
    cy.get(variable1.walletPageLocators.fundingHistory).click()
    cy.get(variable1.walletPageLocators.fundingHistory1).click()
    cy.get(variable1.walletPageLocators.fundingHistoryPage).should('have.text','Your Transaction History')
    cy.get(variable1.walletPageLocators.amountButton).click()
    cy.wait(5000)
    cy.get(variable1.walletPageLocators.transactionRow).then(($transactionRows) => {
    const totalRows = $transactionRows.length;
    // Previous amount for comparison
    let previousAmount;
    // Loop through each transaction row
    for (let i = 0; i < totalRows; i++) {
      // Construct the current amount selector
      const currentAmountSelector = variable1.walletPageLocators.amountColumn.replace('{rowNumber}', i);
      //cy.log(currentAmountSelector)//to see what exactly the locator is
      // Get the current amount and parse it
      cy.get(currentAmountSelector).invoke('text').then((currentAmountString) => {
        const currentAmount = parseFloat(currentAmountString.replace(/[^\d.]/g, ''));
        // Check if it's the first row or not
        if (i === 0) {
          // First row, no previous amount to compare
          previousAmount = currentAmount;
        } else {
          // Compare current amount with previous amount
          expect(currentAmount).to.be.gte(previousAmount);
          // Update previous amount for next iteration
          previousAmount = currentAmount;
        }
      });
    }
  });

  // Check for the next page button if exist go to next page and repeat
  cy.get(variable1.walletPageLocators.nextPageButton).then(($nextPageButton) => {
    if ($nextPageButton.is(':visible')) {
      cy.log('Navigating to the next page');
      cy.get(variable1.walletPageLocators.pageSelector).click();
      this.validateAmountSorting();
    } else {
      cy.log('No more pages to validate');
    }
  });
  
}}//class end