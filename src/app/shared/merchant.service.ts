import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Merchant } from './merchant.model';

@Injectable({providedIn:'root'}) 
export class MerchantService{
    merchant_arr:Merchant[]=[new Merchant('a','b','8989473214','p@visit@.com','3494885999928','abcd','abcd')];
    merchant_added=new Subject<Merchant[]>();
    addMerchant(merchant:Merchant)
    {
        for(let i of this.merchant_arr)
        {
            if(merchant.username===i.username)
            return true;
        }
        this.merchant_arr.push(merchant);
        this.merchant_added.next(this.merchant_arr);
        return false;
    }

    validateMerchant(username:string,password:string)
    {
        var key=0;
        for(let i of this.merchant_arr)
        {
            if(i.username===username)
            {
                if(i.password===password)
                    return key;
                else
                    return -2; 
            }
            key=key+1;
        }
        return -1;
    }
    getMerchant(index:number)
    {
        return this.merchant_arr[index];
    }
}