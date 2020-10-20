import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute,Params,Router} from '@angular/router';
import { MerchantService } from '../shared/merchant.service';

@Component({
  selector: 'app-merchant-login',
  templateUrl: './merchant-login.component.html',
  styleUrls: ['./merchant-login.component.css']
})
export class MerchantLoginComponent implements OnInit {
  signupForm:FormGroup;
  wrong_password:boolean=false;
  no_username:boolean=false;
  validation_done=false;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private merchantService:MerchantService) { }
  onSubmit(form:FormGroup){
    var username=form.value.username;
    var password=form.value.password;
    this.wrong_password=false;
    this.no_username=false;
    this.validation_done=false;
    var key=this.merchantService.validateMerchant(username,password);
    this.validation_done=true;
    if(key===-2)
        this.wrong_password=true;
    else if(key===-1)
        this.no_username=true;
    else
        this.router.navigate(['/merchant-dashboard',key],{relativeTo:this.route});
    }

  ngOnInit(){
    this.signupForm=new FormGroup(
      {
        'username':new FormControl('',Validators.required),
        'password':new FormControl('',Validators.required)
      }
    );
  }

}
