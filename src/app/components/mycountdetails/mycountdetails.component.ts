import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HttpclientService} from '../../services/httpclient/httpclient.service'
@Component({
  selector: 'app-mycountdetails',
  templateUrl: './mycountdetails.component.html',
  styleUrls: ['./mycountdetails.component.scss']
})
export class MycountdetailsComponent implements OnInit {
  constructor(private http:HttpclientService,private route: ActivatedRoute,private router: Router) { }
  ngOnInit() {
    this.username=window.localStorage.getItem('dkname');
   if(!this.username){
        this.router.navigate(['/']);
    }
  }
    username:string='';
    oldpsw:String='';
    newpsw1:String='';
    newpsw2:String='';
    gochange=false;
    changepsw(){
      if(this.newpsw1!=this.newpsw2){
          var hcontent= document.getElementById('errmsg');
          hcontent.innerHTML='新密码前后不一致！'
           this.gochange=false;
      }else{
          this.gochange=true;
      }
    }
       gotoback(){
       this.router.navigate(['/mycount']);
    }
    gotochange(){
        if(this.gochange){
            if(this.newpsw2.trim()!=''){
               let params={
                username:this.username,
                password:this.oldpsw,
                passwordn:this.newpsw2.trim()
               }
               
               this.http.post('changelogin',params).then((config) => {
                   //conosle.log(config)
                   if(config['status']){
                       this.router.navigate(['/']);
                   }else{
                    var hcontent= document.getElementById('errmsg');
                   hcontent.innerHTML=config['message'];
                   }
               })
            }
           
        }
    }
}
