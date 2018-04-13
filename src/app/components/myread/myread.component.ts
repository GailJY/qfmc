import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-myread',
  templateUrl: './myread.component.html',
  styleUrls: ['./myread.component.scss']
})
export class MyreadComponent implements OnInit {

 constructor(private route: ActivatedRoute,private router: Router) { }

   ngOnInit() {
    this.username=window.localStorage.getItem('dkname');
   if(!this.username){
        this.router.navigate(['/']);
    }
  }
    username:string='';
}
