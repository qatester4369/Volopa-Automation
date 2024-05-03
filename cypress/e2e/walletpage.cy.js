///<reference types = 'Cypress'/>

import { SigninPage } from "../PageObject/PageAction/SigninPage";
import { walletPageActions } from "../PageObject/PageAction/walletPageAction";

const wallet = new walletPageActions
const Signin = new SigninPage

describe('Wallet Section ',function(){

    beforeEach(()=>{
        cy.viewport(1440,1000)
        cy.visit('/')    
    })

    it('TC_WD-001  Validate Wallet Dashboard Content',()=>{
        Signin.Login('alexceaki+0141@gmail.com')
        wallet.validate_Dashboard()
    })

    it('TC_WD_002 Validate "Total Companay Balance" on dashboard',()=>{
        Signin.Login('alexceaki+0141@gmail.com')
        wallet.Validate_wallet_total_Balance()
    })

    it('TC_WD_003 Validate  "wallet balance" from Wallet Dashboard',()=>{
        Signin.Login('alexceaki+0141@gmail.com')
        wallet.Total_Wallet_BalanceinEUR()
    })

    it('TC_WD-005  Validate "Convert balance"  tab from wallet dashboard ',()=>{
        Signin.Login('alexceaki+0141@gmail.com')
        wallet.validate_Convert_Balances()
    })

    it('TC_WD -006 Validate "Convert balance"  tab from wallet dashboard  when user have insificent balance ',()=>{
        Signin.Login('alexceaki+0141@gmail.com')
        wallet.validate_Insificent_balance()
    })

    it('TC_WD-007 Validate "Rate Checker"  fromm Wallet dashboard ',()=>{
        Signin.Login('alexceaki+0141@gmail.com')
        wallet.validate_RateChecker_Calculator()
    })

    it('TC_WD_008  Validate "Fund Wallet" tab from wallet dashboard by using east transfer amd validate from "fund history"',()=>{
        Signin.Login('qwerty_admin_1')
        wallet.validate_Fund_Wallet()
    })

    it('TC_WD_009 Validate "Fund Wallet" tab from wallet dashboard with "Manual Push fund "',()=>{
        Signin.Login('qwerty_admin_1')
        wallet.fund_manual_push()
    })
})