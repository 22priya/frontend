import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Cardholder } from './cardholder.model';

@Injectable({providedIn:'root'}) 
export class CardholderService{
    cardholder_arr:Cardholder[]=[
                                new Cardholder('a',0,'','2','3','4'),
                                new Cardholder('bob',0,'','2','3456','78910')
                                ];
    cardholder_added=new Subject<Cardholder[]>();
    addCardholder(cardholder:Cardholder)
    {
        this.cardholder_arr.push(cardholder);
        this.cardholder_added.next(this.cardholder_arr);
    }
    validateCardholder(fingerprint:string,face_img:string)
    {
        for(let i of this.cardholder_arr)
        {
            if(i.fingerprint===fingerprint)
            { 
                if(i.face_img===face_img)
                    return true;
                else
                    return false;
            }
        }
        return false;
    }
}