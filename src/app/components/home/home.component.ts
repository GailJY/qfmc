import { Component, OnInit} from '@angular/core';
import { HeaderComponent } from '../header/header.component'
import {HttpclientService} from '../../services/httpclient/httpclient.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	dataset:Array<any> = [];
    dataset1:Array<any> = [];
    sortset:Array<string> = [];

    constructor(private http:HttpclientService, private router: Router) { }

    ngOnInit() {




        this.http.get('product').then((res)=>{
        	this.dataset=res['data'].data;

            this.dataset1 = this.dataset.slice(4,18);
            
            for(var i=0;i<this.dataset.length;i++){
                if(!this.sortset.includes(this.dataset[i].sort)){
                      this.sortset.push(this.dataset[i].sort);
                  
                    }
            }


           // console.log(this.dataset)
        })


     


        var index = 0;
        var num = 1;
        var liLen;

        $(".slider-next").click(function(){
            index++;
              liLen = $(".slider-frame ul.slider-list li").length;  //目前长度返回值为6
              console.log(liLen)
              if(index >= liLen)
              {
                 $(".slider-frame ul.slider-list").stop();
                 alert("已经到达最后一页！");
                 
             }else{
                 if(index == 0)
                 {
                     $(".slider-frame ul.slider-list").animate({left:-index*210},700);

                 }else{
                     $(".slider-frame ul.slider-list").animate({left:-index*210},700);
                 }
             }
         });
        $(".slider-prev").click(function(){
         if(index == 0)
         {
             $(".slider-frame ul.slider-list").stop();
             alert("这是第一页，不能再往前翻了！");
         }else{
             index--;
             if(index == 0)
             {
                 $(".slider-frame ul.slider-list").animate({left:0},700);
             }else{
                 $(".slider-frame ul.slider-list").animate({left:0},700);
             }
         }
     });
         $('.slider-wrapper').on('click', 'li', (e)=>{
            var id = $(e.target).closest('li').attr('id');     
            this.router.navigate(['/detail/'+id]);        
        })

    }
 


}
