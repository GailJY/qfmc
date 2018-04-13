import { Injectable } from '@angular/core';

@Injectable()
export class MyadderssService {

  constructor() { }
    getname:string | number | string[]='';
    telephone:string | number | string[]='';
    address:string | number | string[]='';
    transition:Object={
        'getname':"姓名",
        'telephone':"电话",
        'address':"地址",
    };

    mydreamlist:Object={
        name:"商品信息",
        price:"价格",
        sort:"类别",
        qty:"数量",
        size:"尺码"
    }
    mydreamli:Array<any>=['username','img',"brand","qty",'goodid',"productID",'id']
}
