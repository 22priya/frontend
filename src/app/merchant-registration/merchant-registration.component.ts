import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Merchant} from '../shared/merchant.model';
import { MerchantService } from '../shared/merchant.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-merchant-registration',
  templateUrl: './merchant-registration.component.html',
  styleUrls: ['./merchant-registration.component.css']
})

export class MerchantRegistrationComponent implements OnInit {
  signupForm:FormGroup;
  merchant_arr:Merchant[];
  invalid_username=false;
  name: FormControl;
  company: FormControl;
  number: FormControl;
  email: FormControl;
  accountNo: FormControl;
  username: FormControl;
  password: FormControl;
  copypassword: FormControl;

  constructor(private merchantService:MerchantService) { }
  
  onSubmit(form:FormGroup)
  {
    var merchant:Merchant=form.value;
    this.invalid_username=this.merchantService.addMerchant(merchant);
    this.merchantService.merchant_added.subscribe(
      (arr:Merchant[])=>
      {
        this.merchant_arr=arr;
      }
    );
  }

  ngOnInit()
  {
    this.merchantService.merchant_added.subscribe(
      (arr:Merchant[])=>
      {
        this.merchant_arr=arr;
      });

    this.signupForm=new FormGroup(
      {
        'name':this.name=new FormControl('',Validators.required),
        'company':this.company=new FormControl('',Validators.required),
        'number':this.number=new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
        'email':this.email=new FormControl('',[Validators.required,Validators.email]),
        'accountNo':this.accountNo=new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(15)]),
        'username':this.username=new FormControl('',Validators.required),
        'password':this.password=new FormControl('',Validators.required),
        'copypassword':this.copypassword=new FormControl('',Validators.required)
      });

  }
}
