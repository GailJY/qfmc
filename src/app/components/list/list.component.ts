import { Component, OnInit } from '@angular/core';
import { HttpclientService } from '../../services/httpclient/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    total: number;
    dataset: Array<any> = [];
    brandset: Array<string> = [];
    pageitems: number = 20;
    isfinish: boolean = true;
    paixu: string = '';
    sort: string = '';
    brand: string = '';
    rowsCount: number = 0;
    isone: boolean = false;

    constructor(private http: HttpclientService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        //请求商品
        this.route.queryParams.subscribe((params) => {
            if(params.brand){
                this.http.get('product',{page:1, pageitems: this.pageitems, paixu: this.paixu, sort: this.sort, brand: params.brand}).then(res=>{
                    if(res['status']){
                        this.rowsCount = res['data'].rowsCount;
                        this.dataset = res['data'].data;
                             
                        if(this.dataset.length < 1){
                            $('.product-nothing').show();
                        }else{
                            $('.product-nothing').hide();
                        }
                    }     
                });
            }else if(params.sort){
                this.http.get('product',{page:1, pageitems: this.pageitems, paixu: this.paixu, sort: params.sort, brand: this.brand}).then(res=>{
                    if(res['status']){
                        this.rowsCount = res['data'].rowsCount;
                        this.dataset = res['data'].data;
                             
                        if(this.dataset.length < 1){
                            $('.product-nothing').show();
                        }else{
                            $('.product-nothing').hide();
                        }
                    }     
                });
            }else{
                this.getProduct(this.pageitems);
            }
        });

        //商品视图
        let timer2 = setInterval(()=>{
            if(this.isone){
                $('.product-row').css({width: '100%',height: 'auto'});
            }else{
                $('.product-row').css({width: '50%',height: '10.133333rem'});
            }
        },1000);
        //商品品牌
        this.http.get('productBrand').then(res=>{
            if(res['status']){
                for(var i=0;i<res['data'].length;i++){
                    if(!this.brandset.includes(res['data'][i].brand)){
                        this.brandset.push(res['data'][i].brand);
                    }  
                }
            }             
        });
        //懒加载
        $('.main').scroll(()=>{
            var top = $('.footer').offset().top;
                 
            if(top<=3000 && this.rowsCount != this.dataset.length){
                this.pageitems +=4;
                this.getProduct(this.pageitems);
            }
        });
        //排序
        $('.nav-paixu').on('click', 'li', function(){
            $(this).find('span').addClass('active').parent().siblings().find('span').removeClass('active');
            if($(this).find('span').text()=='价格由高到低'){
                $('.paixu').find('.two').text('高');
            }else if($(this).find('span').text()=='价格由低到高'){
                $('.paixu').find('.two').text('低');
            }else{
                $('.paixu').find('.two').text('推荐');
            }     
        });
        $('.nav-sort').on('click', 'li', function(){
            $(this).find('span').addClass('active').parent().siblings().find('span').removeClass('active');
            
            $('.sort').find('.two').text($(this).find('span').text());
               
        });
        $('.nav-brand').on('click', 'li', function(){
            $(this).find('span').toggleClass('active');
            var brands = [];
            $('.nav-brand').find('.active').each(function(idx,item){
                brands.push($(item).text());
            })
            $('.brand').find('.two').text(brands.join(', '));
                 
               
        });
        //跳转详细页
        $('.product-list').on('click', 'li', (e)=>{
            var id = $(e.target).closest('li').attr('id');
            clearInterval(timer2);      
            this.router.navigate(['/detail/'+id]);        
        })
    }
    //商品循环key
    trackByName(index, obj) {
        return obj.id;
    }
    //图片loading
    loaded(e){
        e.target.setAttribute('src', this.replaceSrc(e.target.parentNode.getAttribute("data-img")));
   
    }
    replaceSrc(arg){
        var reg = new RegExp('(//c[^_]+_in_)s(.jpg)');
        return arg.replace(reg,'$1pp$2');     
    }
    //商品请求
    getProduct(n){
        if(this.isfinish){
            this.isfinish = false;
            this.http.get('product',{page:1, pageitems: n, paixu: this.paixu, sort: this.sort, brand: this.brand}).then(res=>{
                this.isfinish = true;  
                if(res['status']){
                    this.rowsCount = res['data'].rowsCount;
                    this.dataset = res['data'].data;

                    if(this.dataset.length < 1){
                        $('.product-nothing').show();
                    }else{
                        $('.product-nothing').hide();
                    }
                }     
            });
        }
    }
    

    act(e){
        if(e.target.classList.contains('yi')){
            $('.border').animate({left:'26.35%'},300);
        }else{
            $('.border').animate({left:'36.25%'},300);
        }     
    }

    search(){
        $('.search-view').show().animate({marginTop: 0});
        this.back();
    }
    //搜索确认
    ensure(){
        this.router.navigate(['/list']);
        $('.search-view').animate({marginTop: '17.786667rem'},function(){
            $(this).hide()
        });

        this.paixu = $('.two').eq(0).text();
        this.sort = $('.two').eq(1).text();
        this.brand = $('.two').eq(2).text();

        this.pageitems = 30;
        this.getProduct(this.pageitems);

        $('.main').scrollTop(0);  

        var left = Math.floor($('.border').offset().left);
             
        if(left == Math.floor($('.main').width()*0.2635) || left == Math.floor(-$('.main').width()*0.7365)){
            this.isone = true;
        }else{
            this.isone = false;
        }
        
    }

    topaixu(){
        $('.nav').animate({left:'-100%'},300);
        $('.nav-paixu').animate({left:'0'},300);
        $('.back').show();
    }
    tosort(){
        $('.nav').animate({left:'-100%'},300);
        $('.nav-sort').animate({left:'0'},300);
        $('.back').show();
    }
    tobrand(){
        $('.nav').animate({left:'-100%'},300);
        $('.nav-brand').animate({left:'0'},300);
        $('.back').show();
    }

    back(){
        $('.nav').animate({left:'0'},300);
        $('.nav-paixu').animate({left:'100%'},300);
        $('.nav-sort').animate({left:'100%'},300);
        $('.nav-brand').animate({left:'100%'},300);
        $('.back').hide();
    }
    //搜索重置
    reset(){
        $('.active').removeClass('active');
        $('.nav-paixu').find('li').eq(0).find('span').addClass('active');
        $('.two').eq(0).text('推荐');
        $('.two').eq(1).text('');
        $('.two').eq(2).text('');       
    }

    newproduct(){
        $('.main').scrollTop(0);  

        this.paixu = '';
        this.sort = '';
        this.brand = '';

        this.pageitems = 30;
        this.getProduct(this.pageitems);

        this.reset()
    }
}
