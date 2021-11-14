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

  moneyAmounts: any
  dropForm = new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]);

  balanceForm = new FormGroup({
    hundreds: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    fifties: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    twenties: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    tens: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    fives: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    ones: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    dollarCoins: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    halfDollars: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    quarters: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    dimes: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    nickels: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
    pennies: new FormControl(0, [Validators.required, Validators.pattern("\s*\d*")]),
  });

  takeOutString: string | null =null
  constructor(private router: Router, private moneyAmountService:MoneyAmountService) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if (token == "" || token == null) this.router.navigate(['/login']);
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
          ['halfDollars']: this.moneyAmounts.FiftiesAmount,
          ['quarters']: this.moneyAmounts.QuartersAmount,
          ['dimes']: this.moneyAmounts.DimesAmount,
          ['nickels']: this.moneyAmounts.NicklesAmount,
          ['pennies']: this.moneyAmounts.PenniesAmount,
        });
      }
    }
  }

  updateMoneyAmounts() {
    console.log(this.balanceForm.value);
  this.moneyAmountService.updateMoneyAmount(this.balanceForm.value).subscribe(()=>{
  this.populateMoneyAmounts()
  },error => {console.log(error)})
  }

  ReBalanceMoneyAmounts() {
    this.moneyAmountService.ReBalanceMoneyAmount(new MoneyAmount(
      dollarCoinAmount: 0;
      halfDollarAmount: number;
      quartersAmount: number;
      dimesAmount: number;
      nickelsAmount: number;
      penniesAmount: number;
      hundredsAmount: number;
      fiftiesAmount: number;
      twentiesAmount: number;
      tensAmount: number;
      fivesAmount: number;
      onesAmount: number;
      totalAmount: number;
    )).subscribe(()=>{
      this.takeOutString=localStorage.getItem('TakeOutString')
      this.moneyAmountService.getMoneyAmount().subscribe(()=>
      this.populateMoneyAmounts())},
      ()=>{
        this.takeOutString=null
      })
  }

  clearForm() {
    window.location.reload();
    this.balanceForm.reset(0);
  }
}
