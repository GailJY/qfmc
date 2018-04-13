import { Component, OnInit } from '@angular/core';
import {HttpclientService} from '../../services/httpclient/httpclient.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpclientService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
  }
    loginarray:Array<any>=[0,0]
   checkMobile(){ 
     var sMobile =this.params['username']; 
     var registerfrom=document.getElementById('errlogin')
     if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){ 
       registerfrom.innerHTML="手机号码不正确"; 
       this.loginarray[0]=0;
      return; 
     }else{
        registerfrom.innerHTML=""; 
        this.loginarray[0]=1;
     } 
     
    }
  params:Object={'username':'','password':''}
  dylogin(){
   this.checkMobile();
   if(this.loginarray[0]==0){
        return;
   }
   if(this.params['password'].trim()==""){
      var registerfrom=document.getElementById('errlogin') 
       registerfrom.innerHTML="密码不能为空"; 
       this.loginarray[1]=0;
   }else{
       this.loginarray[1]=1; 
   }
   this.params['password']=this.params['password'].trim();
    var i=0;
   this.loginarray.map((item)=>{
        if(item==0){
            return;
        }
        i++;
        if(i==2){
         
         this.http.post('login',this.params).then((config) => {
            
            if(!config['status']){
            
                var registerfrom=document.getElementById('errlogin') 
                registerfrom.innerHTML=config['message']; 
            }else{
             
               window.localStorage.setItem('dktoken',config['token']);
               window.localStorage.setItem('dkname',this.params['username']);
               
                this.router.navigate(['/']);
                
            }
         })
        }
   })
   
  }
}
