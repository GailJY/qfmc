import { Component, OnInit,AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HttpclientService} from '../../services/httpclient/httpclient.service'
import {MyadderssService} from '../../services/myaddress/myadderss.service'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit,AfterViewChecked {

 constructor(private http:HttpclientService,private route: ActivatedRoute,private router: Router,private myaddr:MyadderssService) { }

  ngOnInit() {
    
    // this.username=window.localStorage.getItem('dkname');
    //  if(!this.username){
    //       this.router.navigate(['/']);
    //   }
    // this.username='13533273641'
    // this.http.post('buylist',{username:this.username}).then((config) => {
    //   if(config['status']){
    //       this.buylistfirst=config['data'];
         
    //      let datagood=this.buylistfirst.map((item)=>{
    //         return item['goods']
    //      })
       

    //      if(datagood.length>0){
    //           datagood.map((item)=>{
    //               let eachitem=item.split(',')
    //               let objitem=[];
    //                 eachitem.map((item)=>{
    //                    this.http.post('productIds',{id:item}).then((config) => {
    //                    objitem.push(config[0]);
                         
                         
    //                    }) 
                       
    //                 }) 
    //                 this.buylistdetail.push(objitem)
                   
    //           })
    //      }
         
    //       //this.addscroll()
    //   }
    // })
    

  }

 ngAfterViewChecked(){
   // setTimeout(function(){
   //    this.addscroll()
   // }.bind(this),600)
   
 }



    // username:string='';
    // buylistfirst:Array<any>=[];
    // buylistdetail:Array<any>=[];
    // gotoback(){
    //    this.router.navigate(['/mycount']);
    // }
    // addscroll(){
    //    // console.log('232323')
    //      var images = document.getElementsByClassName('loadimg');
    //    // console.log(images,images.length)
    //     var len    = images.length;
    //     var n      = 0;      //存储图片加载到的位置，避免每次都从第一张图片开始遍历       
    //    //console.log(len)
    //     var seeHeight = document.documentElement.clientHeight;
    //     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
       
    //     var mainscrollTop=document.getElementsByClassName('dymyorder')[0];
    //       var mllTop=0;
    //       if(mainscrollTop['scrollTop']){
    //            mllTop=mainscrollTop['scrollTop'];
    //       }
    //   //console.log(images)
           
   
    //     for(let i = n; i < len; i++){
    //        // console.log(images[i])
                 
    //          if(images[i].offsetTop+170< seeHeight + mllTop) {
           
                
    //             if(images[i].getAttribute('src') == './assets/imgs/1.gif') {
                   
    //                 //console.log(images[i].src)
    //              images[i].src = images[i].getAttribute('datasrc');
    //          }
    //         n = n + 1;
    //           }
    //     }
     
      
    // }

  }
