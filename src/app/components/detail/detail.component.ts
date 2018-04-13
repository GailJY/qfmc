import { Component, OnInit } from '@angular/core';
import { HttpclientService } from '../../services/httpclient/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    dataset: Object = {};
    videoStr: string = '';
    id: string = ''; 
    n: number = 5;
    dataset2: Array<any> = [];

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpclientService) { }

    ngOnInit() {
        //接收参数生成商品
        this.route.params.subscribe((params) => {  
            this.id = params.id;
            this.http.get('productId',{id: this.id}).then(res=>{
                if(res['status']){
                    this.dataset = res['data'][0];
                    var page = Math.floor(Math.random()*3+1);
                    this.http.get('product', {page, pageitems: 6, sort: this.dataset['sort']}).then(res=>{
                        if(res['status']){
                            this.dataset2 = res['data'].data;
                        }
                             
                    })
                }

                var reg = new RegExp('[0-9]+');
                this.videoStr = 'https://video.net-a-porter.com/videos/productPage/' + (res['data'][0].img).match(reg)[0] + '_detail.mp4';

                   
                if(this.dataset['sort']!='服装'){
                    $('.sel').hide();
                    $('.video-open').hide();
                    this.videoStr = 'https://video.net-a-porter.com/videos/productPage/984610_detail.mp4';
                    this.n --;
                }
            })
        });

        //商品视频
        (function(){
            var video = document.getElementById('video');
            var timer1 = null;
            $('.icon-video_play').click(function(){
                $('.main-image-carousel').fadeOut();
                $('#product-video').fadeIn();

                video['play']();
                video['currentTime'] = 0 ;

                timer1 = setInterval(function(){
                    var range = ((video['currentTime']/video['duration'])*100).toFixed(2);
                    $('#seekbarProgress').css({'width':range+'%'});
                },100)
                     
            })

            $('#close').click(function(){
                $('.main-image-carousel').fadeIn();
                $('#product-video').fadeOut();
                video['pause']();
                $('#playpause').animate({opacity: '0'});
                $('#playpause').css('backgroundPosition-x','78.74015748031496%');
                clearInterval(timer1);
            })
            
            $('#video').click(function(){
                if($('#playpause').css('backgroundPosition-x')=='78.7402%'){
                    video['pause']();
                    $('#playpause').animate({opacity: '0.8'});
                    $('#playpause').css('backgroundPosition-x','94.48818897637796%');
                }else{
                    video['play']();
                    $('#playpause').animate({opacity: '0'});
                    $('#playpause').css('backgroundPosition-x','78.74015748031496%');
                }
            });

            $('#playpause').click(function(){
                if($('#playpause').css('backgroundPosition-x')=='78.7402%'){
                    video['pause']();
                    $('#playpause').animate({opacity: '0.8'});
                    $('#playpause').css('backgroundPosition-x','94.48818897637796%');
                }else{
                    video['play']();
                    $('#playpause').animate({opacity: '0'});
                    $('#playpause').css('backgroundPosition-x','78.74015748031496%');
                }
            });

            //监听视频结束
            video.addEventListener("ended",function(){
                $('.main-image-carousel').fadeIn();
                $('#product-video').fadeOut();
                clearInterval(timer1);
            }) 
        })()

        //商品左右查看
        var num = 0;
        $('.swiper-prev-button').click(()=>{   
            if(num<=0){
                num = this.n;
            }else{
                num--;
            }
            $('.image-counter').find('span').text(num+1);
            $('.swiper-wrapper').find('li').eq(num).fadeIn().siblings().fadeOut();
        });
        $('.swiper-next-button').click(()=>{
            if(num>=this.n){
                num = 0;
            }else{
                num++;
            }
            $('.image-counter').find('span').text(num+1);
            $('.swiper-wrapper').find('li').eq(num).fadeIn().siblings().fadeOut();
        });

        $('.product-list').on('click', 'li', (e)=>{
            var id = $(e.target).closest('li').attr('id'); 
            this.router.navigate(['/detail/'+id]);
            window.location.reload();   
        })
    }
    
    //商品循环key
    trackByName(index, obj) {
        return obj.id;
    }


    //图片loading
    loading(e){
        return false;
    }
    loaded(e){
        e.target.setAttribute('src', this.replaceSrc(e.target.parentNode.getAttribute("data-img")));
    }
    loaded1(e){
        e.target.setAttribute('src', this.replaceSrc1(e.target.parentNode.getAttribute("data-img") || '../../../assets/imgs/loading.gif'));
    }
    loaded2(e){
        e.target.setAttribute('src', this.replaceSrc2(e.target.parentNode.getAttribute("data-img") || '../../../assets/imgs/loading.gif'));
    }
    loaded3(e){
        e.target.setAttribute('src', this.replaceSrc3(e.target.parentNode.getAttribute("data-img") || '../../../assets/imgs/loading.gif'));
    }
    loaded4(e){
        e.target.setAttribute('src', this.replaceSrc4(e.target.parentNode.getAttribute("data-img") || '../../../assets/imgs/loading.gif'));
    }
    loaded5(e){
        e.target.setAttribute('src', this.replaceSrc5(e.target.parentNode.getAttribute("data-img") || '../../../assets/imgs/loading.gif'));
    }


    replaceSrc(arg){
        var reg = new RegExp('(//c[^_]+_in_)s(.jpg)');
        return arg.replace(reg,'$1pp$2');     
    }
    replaceSrc1(arg){
        var reg = new RegExp('(//c[^_]+_in_)s(.jpg)');
        return arg.replace(reg,'$1pp$2');     
    }
    replaceSrc2(arg){
        var reg = new RegExp('(//c[^_]+)_in_s(.jpg)');
        return arg.replace(reg,'$1_ou_pp$2');     
    }
    replaceSrc3(arg){
        var reg = new RegExp('(//c[^_]+)_in_s(.jpg)');
        return arg.replace(reg,'$1_fr_pp$2');     
    }
    replaceSrc4(arg){
        var reg = new RegExp('(//c[^_]+)_in_s(.jpg)');
        return arg.replace(reg,'$1_bk_pp$2');     
    }
    replaceSrc5(arg){
        var reg = new RegExp('(//c[^_]+)_in_s(.jpg)');
        return arg.replace(reg,'$1_cu_pp$2');     
    }



    //加入购物车
    addtocar(){
         var names=window.localStorage.getItem('dkname');
        if(window.localStorage.getItem('dkname')){
            if($('.sel').css('display')=='block'){
                if($('.select').val() == '-'){
                    $('.tooltip').show();
                    $('.select').css('border','1px solid #f00');
                }else{
                    window.localStorage.setItem('username',names);
                    this.http.post('addtocar',{username: window.localStorage.getItem('username'), productID: this.id, size: $('.select').val()}).then(res=>{
                        if(res['status']){
                            this.cartips();
                        }else{
                            window.alert('操作失败')
                        }     
                    }).catch(error=>{
                        window.alert(error)
                    })
                }  
            }else{
               // window.localStorage.setItem('username','13432888888');
                window.localStorage.setItem('username',names);
                this.http.post('addtocar',{username: window.localStorage.getItem('username'), productID: this.id, size: '均码'}).then(res=>{
                    if(res['status']){
                        this.cartips();
                    }else{
                        window.alert('操作失败');
                    }     
                }).catch(error=>{
                    window.alert(error)
                })
            }  
        }else{
            this.router.navigate(['/login']);
        }
    }

    //加入愿望清单
    addtowish(){
        if(window.localStorage.getItem('dkname')){
            this.http.post('addtowish',{username: window.localStorage.getItem('username'), productID: this.id}).then(res=>{
                if(res['status']){
                    window.alert('已加入愿望清单');
                }else if(res['message']){
                    window.alert(res['message']);
                }else{
                    window.alert('操作失败');
                }          
            }).catch(error=>{
                window.alert(error);
            })
        }else{
            this.router.navigate(['/login']);
        }
    }

    //成功加入购物车提示
    hidetips(){
        $('.tooltip').hide();
        $('.select').css('border','1px solid #ccc');
    }
    hide(){
        $('.tooltip').hide();
        $('.cartips').fadeOut();
        $('.cover').fadeOut();
    }
    cartips(){
        $('.cartips').fadeIn();
        $('.cover').fadeIn();
        $('.cartips').find('img').attr('src', $('.swiper-wrapper').find('li').eq(0).find('img').attr('src'));
        $('.cartips').find('.brand').find('span').text($('.container-title').find('.name').text());
        $('.cartips').find('.name').find('span').text($('.container-title').find('.product-name').text());
        $('.cartips').find('.price').find('span').text($('.container-title').find('.product-price').text());
        var size = null;
        if($('.sel').css('display')=='block'){
            size = $('.select').val();
        }else{
            size = '均码';
        }
        $('.cartips').find('.size').find('span').text(size);

        let timer0 = setInterval(function(){
            $('.cartips').fadeOut();
            $('.cover').fadeOut();
            clearInterval(timer0);
        },2000);
    }

    //放大镜
    zoom(e){
        $('.zoom-img').find('img').attr('src', this.replaceSrc6($(e.target).attr('src')));
        $('.zoom').show();     
    }
    zoomClose(){
        $('.zoom').hide();
    }
    replaceSrc6(arg){
        var reg = new RegExp('(//c[^_]+_.+_)pp(.jpg)');
        return arg.replace(reg,'$1xl$2');     
    }
    tobrand(e){
        this.router.navigate(['/list'],{queryParams: {brand: $('.designer-name').find('span').text()}});
    }

}
