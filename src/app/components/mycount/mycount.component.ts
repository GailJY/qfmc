import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-mycount',
  templateUrl: './mycount.component.html',
  styleUrls: ['./mycount.component.scss']
})
export class MycountComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
        let ss=window.localStorage.getItem('dkname');
        var pattern = "(\\d{3}).+(\\d{4})";  
        var replacement = "$1****$2";  
        let _reg = new RegExp(pattern);
       // console.log(ss);
        if(!ss){
          this.router.navigate(['/login']);
        }
        this.username =ss.replace(_reg, replacement); 
      //console.log(this.username)
    if(!this.username){
        this.router.navigate(['/login']);
    }
  }
    username:string='';
    outhere(){
     window.localStorage.removeItem('dkname');
     window.localStorage.removeItem('dktoken');
     this.router.navigate(['/']);
  }
}
