import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HttpclientService} from '../../services/httpclient/httpclient.service'
import {MyadderssService} from '../../services/myaddress/myadderss.service'
@Component({
  selector: 'app-mydream',
  templateUrl: './mydream.component.html',
  styleUrls: ['./mydream.component.scss']
})
export class MydreamComponent implements OnInit {

  constructor(private http:HttpclientService,private route: ActivatedRoute,private router: Router,private myaddr:MyadderssService) { }

  ngOnInit() {
    this.username=window.localStorage.getItem('dkname');
   if(!this.username){
        this.router.navigate(['/']);
    }

     this.http.post('myorder',{username:this.username}).then((config) => {
      //console.log(config)
      var gooodsid=config['data']?config['data']:[];
      var goodind=[];
        gooodsid.map((item)=>{
            if(item['productID']){
             this.http.post('product',{id:item['productID']}).then((configs) => {
              //console.log(configs)
                configs['data'][0]['size']=item['size'];
                 configs['data'][0]['qty']=item['qty'];
                  configs['data'][0]['username']=item['username'];
                goodind.push(configs['data'][0])
               // console.log(goodind)
                this.myorder=goodind;
                this.myorders=goodind;
                this.myorderkey=this.getKey(goodind[0]);
             })
            } 
        })
       
      
        
     })
  }
    username:string='';
    myorder:Array<any>=[];
    myorders:Array<any>=[];
  
    myorderkey:Array<any>=[];
    myorderselect:string='全部';
    mysort:Array<any>=['全部','配饰','包袋','美容','服装','内衣','鞋履','珠宝手表'];
    getKey(item){
      return Object.keys(item)||[];
    }
     gotoback(){
       this.router.navigate(['/mycount']);
    }
    getAll(){
        //this.myorderselect=='全部'
       //  this.http.post('myorder',{username:this.username}).then((config) => {
    
       // if(config['status']){
         //   this.myorder=config['data'];
         //  this.myorders=config['data'];
          //  this.myorderkey=this.getKey(this.myorder[0]);
       // }
    // })
      //console.log(this.username)
         this.http.post('myorder',{username:this.username}).then((config) => {
      //console.log(config,222)
      if(!config['status']){
          console.log(2223)
          this.myorder=[];
          this.myorders=[];
          this.myorderkey=[];
      }
      var gooodsid=config['data']?config['data']:[];
      var goodind=[];
        gooodsid.map((item)=>{
            if(item['productID']){
             this.http.post('product',{id:item['productID']}).then((configs) => {
              //console.log(configs)
                configs['data'][0]['size']=item['size'];
                 configs['data'][0]['qty']=item['qty'];
                 configs['data'][0]['username']=item['username'];
                goodind.push(configs['data'][0])
               // console.log(goodind)
                this.myorder=goodind;
                this.myorders=goodind;
                this.myorderkey=this.getKey(goodind[0]);
             })
            } 
        })
        }
        )
    }
    deleteObj(idx){
      console.log(idx)
        let parms={
          username:this.myorder[idx].username,
          productID:this.myorder[idx].id,
        }
        console.log(parms,this.myorder[idx])
        this.myorderselect='全部';
         this.http.post('deleteorder',parms).then((config) => {
            //this.myorder.splice(idx,1);
            this.getAll()
          
    })
    }
    changeselect(){
        console.log(this.myorderselect)
        if(this.myorderselect=='全部'){
            this.getAll();
        }else{
         this.myorder= JSON.parse(JSON.stringify(this.myorders)) 
          this.myorder=this.myorder.filter((item)=>{
                return item['sort']==this.myorderselect;
          })
          console.log(this.myorder);
          this.myorderkey=this.getKey(this.myorder[0]);
        }
    }

}