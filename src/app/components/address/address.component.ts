import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HttpclientService} from '../../services/httpclient/httpclient.service'
import {MyadderssService} from '../../services/myaddress/myadderss.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {

  constructor(private http:HttpclientService,private route: ActivatedRoute,private router: Router,private myaddr:MyadderssService) { }

  ngOnInit() {
    this.username=window.localStorage.getItem('dkname');
   if(!this.username){
        this.router.navigate(['/']);
    }
     //console.log(this.username)
     this.http.post('address',{username:this.username}).then((config) => {
         //console.log(config)
          if(config['data']){
            let lens=config['data'].length-1;
              this.hasaddress=true;
              this.myaddr.getname=config['data'][lens]['name'];
              this.myaddr.telephone=config['data'][lens]['tele'];
              this.myaddr.address=config['data'][lens]['address'];
              this.ars=this.getkey(this.myaddr);
             
          }else{
             this.ars=this.getkey(this.myaddr);
          }
             //console.log(this.ars)

     })
  }
    getkey(params){
      let arr=[];
        return arr=Object.keys(params);
    }
    username:string='';
    hasaddress=false;
    ars:Array<any>=[];
    gotoback(){
       this.router.navigate(['/mycount']);
    }
    changeaddress(){
        
        $('.changeaddress').show().animate({top:"110"});
    }
    saveaddress(){
        var changeaddress=$('.changeaddress input');
        this.myaddr.getname=changeaddress.eq(0).val();
        this.myaddr.telephone=changeaddress.eq(1).val();
        this.myaddr.address=changeaddress.eq(2).val();
        this.http.post('updateaddress',{username:this.username,name:this.myaddr.getname,tele:this.myaddr.telephone,address:this.myaddr.address}).then((config) => {
           
              if(config['status']){
                 this.http.post('address',{username:this.username}).then((config) => {
         
          if(config['data']){
            let lens=config['data'].length-1;
              this.hasaddress=true;
              this.myaddr.getname=config['data'][lens]['name'];
              this.myaddr.telephone=config['data'][lens]['tele'];
              this.myaddr.address=config['data'][lens]['address'];
              this.ars=this.getkey(this.myaddr);
             
          }else{
             this.ars=this.getkey(this.myaddr);
          }
             //console.log(this.ars)

     })
                 $('.changeaddress').animate({bottom:"0"}).hide();

              }
        })
        
    }
}
