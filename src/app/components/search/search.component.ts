import { Component, OnInit } from '@angular/core';
import {HttpclientService} from '../../services/httpclient/httpclient.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ComService} from '../../services/com.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private http:HttpclientService, private router: Router,private com:ComService) { }

  ngOnInit() {


  }

  back(){
        $('.qf-search-pupup').show().animate({marginTop:'-17.786667rem'})
  }

  searchvalue:string;
  dataset:Array<any>=[];
  focus(val){
        this.http.get('mohu',{mohu:val}).then((res)=>{
         this.dataset = res['data'];
        })
  }
  gotolist(index){
    this.router.navigate(['/detail/'+index]);
    this.com.show = false;
    if(this.com.show){
          $('.qf-search-pupup').show()
        }else{
          $('.qf-search-pupup').hide()
           $('.input').val('');
        this.dataset = [];
        }
  }


}
