import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {HttpclientService} from '../../services/httpclient/httpclient.service';

@Component({
  selector: 'app-buycar',
  templateUrl: './buycar.component.html',
  styleUrls: ['./buycar.component.scss']
})
export class BuycarComponent implements OnInit {
    dataset:Array<any>;
    resul:Array<any>;
    price1:number=0;
    price2:number=0;
    price3:number=15;
    objId:Number;
    username:string;
    

  constructor(private http:HttpclientService,private router:Router) { }

    ngOnInit() {
       
        this.username = window.localStorage.getItem('dkname');
        console.log(this.username)
        this.http.get('getcarlist',{username:this.username}).then((res)=>{
          this.dataset=res['data'];
          console.log(res);
        })



    }

    getKeys(item){
      return item ? Object.keys(item):[];
    }

    //删除商品
    delete(event){
    const e = event.target;
      if(e.innerText=='从购物袋中删除'){
        let id = e.parentNode.parentNode.parentNode.id;
        let size = (e.previousSibling.previousSibling.previousSibling.previousSibling.children[1].innerText); 
          this.http.get('delProduct',{username:this.username,id:id,size:size}).then((res)=>{
               //console.log(res);
               if(res['status']){
                  $(e).closest('.good').remove();
               }
               if($('.good').length<1){
                  this.router.navigate(['buycar2']);
                }
            })
            
      }
    }
    


    input(e,price){
          if($(e.target).prop("checked")){
              //console.log( $(e.target).prev('.good'));
            $('.span-money').text(this.price1 =this.price1+price*1);
            $('.goods-money2-labels2').text(this.price2=this.price1);
          }else{ 
              $('.span-money').text(this.price1 -=price*1);
               $('.goods-money2-labels2').text(this.price2 -=price);
          }   
        }
    gotoend(){
        alert("成功支付");
         this.router.navigate(['']);
    }
}
