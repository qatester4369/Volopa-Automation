export class WalletDashboard
{
    vlidateMainPageHeading(){
        cy.get('.ant-col-xs-21 > .fs-18px').should('contain.text','Wallet Dashboard')
    }
    validateCardtotalBalance(){
        cy.wait(9000)
        cy.get('.ant-col-lg-10 > :nth-child(2) > .ant-col > .ant-typography').eq(0).then((value1)=>{
         let Total=value1.text().trim()
        Total = Total.replace(/,/g, '').replace("€", "").replace(/&nbsp;/g, '');
        cy.log(Total)
       let wbalance, cbalance
        cy.wait(2000)
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
    validateAllContentOnDashbordPage(){
        cy.get('.ant-typography.light-green.medium.fs-28px').should('contain.text','Total Company Balance')
        cy.get("span[class='ant-typography dark-green medium fs-28px']").should('contain.text','Wallet Balance')
        cy.get('.ant-typography.dark-green.medium.fs-28px.pointer').should('contain.text','Cards Balance')
        cy.get('.slick-slide.slick-active.slick-current div div div .ant-card.ant-card-bordered.ant-card-hoverable.b-g.center-align-text.hover-no-border')
        .should('contain.text','Convert Balances')
        cy.get('[class="ant-typography muli semi-bold fs-18px"]').eq(1).should('contain.text','Fund Card')
        cy.get('[class="ant-typography muli semi-bold fs-18px"]').eq(2).should('contain.text','Fund Wallet')
        cy.get('[class="ant-typography dark-green medium fs-25px"]').should('contain.text','Recent Activity - ')
        cy.get('.ant-col-md-20 > :nth-child(1) > .ant-col-24 > .fs-25px').should('contain.text','Wallet Breakdown')
        cy.get('.ant-col-sm-18 > :nth-child(1) > .ant-col > .ant-typography').should('contain.text','Rate Checker')
        cy.get('.ant-col-sm-20 > :nth-child(1) > .ant-col > .ant-typography').should('contain.text','Recent Funding History')
    }
}