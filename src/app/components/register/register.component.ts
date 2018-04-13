import { Component, OnInit } from '@angular/core';
import './font-awesome-4.7.0/css/font-awesome.css'
import {HttpclientService} from '../../services/httpclient/httpclient.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

 
  constructor(private http:HttpclientService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    for(let i=0;i<this.distnumber;i++){
       this.distnumbers.push(i+1)
    }
      for(let i=0;i<12;i++){
      let j=(i+1)+'月';
       this.distmounths.push(j)
    }

  }
  customdata:object={'firstname':'','lastname':'','account':'','psw':''};
  customarray:Array<any>=[0,0,0,0];
  password:string='';
  message=false;
  messagejx=false;
  distarea:Array<any>=['中国','台湾','香港','澳门'];
  distnumber:number=31;
    distnumbers:Array<any>=[];
     distmounths:Array<any>=[];
  checkMobile(){ 
     var sMobile =this.customdata['account']; 
     var registerfrom=document.getElementById('regform')
     if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){ 
       registerfrom.innerHTML="手机号码不正确"; 
      return; 
     }else{
        registerfrom.innerHTML=""; 
        this.customarray[2]=1;
     } 
     
    }
  login(){
   var registerfrom=document.getElementById('regform')
           if(this.customdata['firstname'].trim()==''){
                registerfrom.innerHTML='名字不能为空';
                this.customarray[0]=0;
                return;
           }else{
                 registerfrom.innerHTML='';
                  this.customarray[0]=1;
           }

            if(this.customdata['lastname'].trim()==''){
                registerfrom.innerHTML='姓氏不能为空';
                 this.customarray[1]=0;
                return;
           }else{
                 registerfrom.innerHTML='';
                  this.customarray[1]=1;
           }
            if(this.customdata['account'].trim()==''){
                registerfrom.innerHTML='手机帐号不能为空';
                 this.customarray[2]=0;
                return;
           }else{
                this.checkMobile();
           }
            if(this.customdata['psw'].trim()==''){
                registerfrom.innerHTML='密码不能为空';
                  this.customarray[3]=0;
                return;
           }else{
             this.customarray[3]=1;
           }
  }
  tologin(){
   
    for(let i=0;i<4;i++){
        if(this.customarray[i]=='0'){
            return;
        }
    }
    if(this.customdata['psw']!=''){
        
        this.password=this.customdata['psw'].replace(/\s/g, "");
        this.customdata['psw']=this.password;
    }
     var params={username:this.customdata['account'],password:this.customdata['psw']}
    this.http.post('registers',params).then((config) => {
       
        if(!config['status']){
          alert(config['message'])
        }else{
            this.router.navigate(['/login']);
        }
    })
  }
  tomessage(){
    this.message=!this.message;
  }
  messa(){
    this.messagejx=!this.messagejx;
  }
}
