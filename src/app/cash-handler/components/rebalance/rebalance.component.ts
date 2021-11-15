import { Component, OnInit } from '@angular/core';
import { MoneyAmount } from "../../../models/moneyAmount/money-amount.model";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { MoneyAmountService } from "../../../services/money-amount/money-amount.service";
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-rebalance',
  templateUrl: './rebalance.component.html',
  styleUrls: ['./rebalance.component.css']
})


export class RebalanceComponent implements OnInit {

  giveBack: string | null ="error has occurred";
  hasSubmitted=false;
  transactionSuccess=false;
  transactionError=false;
  isDropped=false;
  moneyAmounts: any;

  dropForm = new FormControl(0, [Validators.required]);

  balanceForm = new FormGroup({
    hundreds: new FormControl(0, [Validators.required]),
    fifties: new FormControl(0, [Validators.required]),
    twenties: new FormControl(0, [Validators.required]),
    tens: new FormControl(0, [Validators.required]),
    fives: new FormControl(0, [Validators.required]),
    ones: new FormControl(0, [Validators.required]),
    dollarCoins: new FormControl(0, [Validators.required]),
    halfDollars: new FormControl(0, [Validators.required]),
    quarters: new FormControl(0, [Validators.required]),
    dimes: new FormControl(0, [Validators.required]),
    nickels: new FormControl(0, [Validators.required]),
    pennies: new FormControl(0, [Validators.required]),
  });

  takeOutString: string | null =null
  constructor(private router: Router, private moneyAmountService:MoneyAmountService) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if (token == "" || token == null) this.router.navigate(['/login']);
    this.setFormValues();
    this.isDropped = false;
  }

  setFormValues() {
    this.moneyAmountService.getMoneyAmount().subscribe( result => {console.log(result);});
    if (localStorage.getItem('moneyAmount') != null)  {
      let moneyAmountStr: string | null = localStorage.getItem("moneyAmount");
      if (moneyAmountStr) {
        this.moneyAmounts = JSON.parse(moneyAmountStr) as MoneyAmount;
        this.balanceForm.setValue({
          ['hundreds']: this.moneyAmounts.HundredsAmount,
          ['fifties']: this.moneyAmounts.FiftiesAmount,
          ['twenties']: this.moneyAmounts.TwentiesAmount,
          ['tens']: this.moneyAmounts.TensAmount,
          ['fives']: this.moneyAmounts.FivesAmount,
          ['ones']: this.moneyAmounts.OnesAmount,
          ['dollarCoins']: this.moneyAmounts.DollarCoinAmount,
          ['halfDollars']: this.moneyAmounts.HalfDollarAmount,
          ['quarters']: this.moneyAmounts.QuartersAmount,
          ['dimes']: this.moneyAmounts.DimesAmount,
          ['nickels']: this.moneyAmounts.NicklesAmount,
          ['pennies']: this.moneyAmounts.PenniesAmount,
        });
      }
    }
  }

  getFormTotal() {
    return this.convertToCurrency(
      this.balanceForm.value.hundreds * 100
      + this.balanceForm.value.fifties * 50
      + this.balanceForm.value.twenties * 20
      + this.balanceForm.value.tens * 10
      + this.balanceForm.value.fives * 5
      + this.balanceForm.value.ones
      + this.balanceForm.value.dollarCoins
      + this.balanceForm.value.halfDollars * 0.5
      + this.balanceForm.value.quarters * 0.25
      + this.balanceForm.value.dimes * 0.10
      + this.balanceForm.value.nickels * 0.05
      + this.balanceForm.value.pennies * 0.01);
  }

  getCurrentBalance() {
    return this.convertToCurrency(this.moneyAmounts.TotalAmount);
  }

  convertToCurrency(amount: number) {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }

  getHundredsValue() {
    return this.convertToCurrency(this.balanceForm.value.hundreds * 100);
  }

  getFiftiesValue() {
    return this.convertToCurrency(this.balanceForm.value.fifties * 50);
  }

  getTwentiesValue() {
    return this.convertToCurrency(this.balanceForm.value.twenties * 20);
  }

  getTensValue() {
    return this.convertToCurrency(this.balanceForm.value.tens * 10);
  }

  getFivesValue() {
    return this.convertToCurrency(this.balanceForm.value.fives * 5);
  }

  getOnesValue() {
    return this.convertToCurrency(this.balanceForm.value.ones * 1);
  }

  getDollarCoinsValue() {
    return this.convertToCurrency(this.balanceForm.value.dollarCoins * 1);
  }

  getHalfDollarsValue() {
    return this.convertToCurrency(this.balanceForm.value.halfDollars * 0.5);
  }

  getQuartersValue() {
    return this.convertToCurrency(this.balanceForm.value.quarters * 0.25);
  }

  getDimesValue() {
    return this.convertToCurrency(this.balanceForm.value.dimes * 0.10);
  }

  getNickelsValue() {
    return this.convertToCurrency(this.balanceForm.value.nickels * 0.05);
  }

  getPenniesValue() {
    return this.convertToCurrency(this.balanceForm.value.pennies * 0.01);
  }

  getDifference() {
    return this.convertToCurrency(this.moneyAmounts.TotalAmount - this.dropForm.value);
  }

  isValidDrop() {
    if (this.moneyAmounts.TotalAmount - this.dropForm.value > 0) { return true;}
    return false;
  }

  dropCash() {
    this.moneyAmountService.ReBalanceMoneyAmount({TargetAmount: this.dropForm.value}).subscribe(result => {
      console.log(localStorage.getItem('TakeOutString'));
    }, error => console.log(error));
    this.setFormValues();
    this.isDropped=true;
    this.dropForm.reset();
    this.dropForm.setValue(0);
    console.log(this.dropForm.value);
  }

  getDropHint() {
    return localStorage.getItem('TakeOutString');
  }

  updateBalance() {
    console.log("Called function updateMoneyAmounts()");
    this.moneyAmountService.updateMoneyAmount({
      HundredsAmount: this.balanceForm.value.hundreds,
      FiftiesAmount: this.balanceForm.value.fifties ,
      TwentiesAmount: this.balanceForm.value.twenties ,
      TensAmount: this.balanceForm.value.tens ,
      FivesAmount: this.balanceForm.value.fives,
      OnesAmount: this.balanceForm.value.ones,
      DollarCoinAmount: this.balanceForm.value.dollarCoins,
      HalfDollarAmount: this.balanceForm.value.halfDollars ,
      QuartersAmount: this.balanceForm.value.quarters ,
      DimesAmount: this.balanceForm.value.dimes ,
      NicklesAmount: this.balanceForm.value.nickels,
      PenniesAmount: this.balanceForm.value.pennies,
      }
    ).subscribe(()=>{
      this.moneyAmountService.getMoneyAmount().subscribe(()=>
        this.setFormValues())},
      ()=>{
        this.takeOutString=null
    })
  }
}
