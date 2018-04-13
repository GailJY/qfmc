import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit,OnDestroy {
    timer: any;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        //广告
        var n = 1;
        this.timer = setInterval(function(){
            $('.service-banner').eq(n).fadeIn().siblings().fadeOut();
            $('.service-banner-bottom').eq(n).fadeIn().siblings().fadeOut();
            if(n < $('.service-banner-bottom').length-1){
                n++;
            }else{
                n = 0;
            }    
        }, 5000);
        $('.dismiss-icon').click(function(e){
            $(e.target).closest('.promo-bar').fadeOut();
        });


        //底部动画
        $('.product-nav').on('click', '.header-title', function(){ 
            $(this).next('.show-hide-content').slideToggle();

            if($(this).prev('.icon-jia-jian').css('backgroundPosition-x')=='18.5874%'){
                $(this).prev('.icon-jia-jian').css('backgroundPosition','92.93680297397769% 80.3921568627451%'); 
            }else{
                $(this).prev('.icon-jia-jian').css('backgroundPosition','18.587360594795538% 90.19607843137256%');
            }
        });
        $('.fuwu').on('click', '.icon-jia-jian', function(){ 
            $(this).parent().find('.show-hide-content').slideToggle();

            if($(this).css('backgroundPosition-x')=='18.5874%'){
                $(this).css('backgroundPosition','92.93680297397769% 80.3921568627451%'); 
            }else{
                $(this).css('backgroundPosition','18.587360594795538% 90.19607843137256%');
            }
        });
    }

    ngOnDestroy(){
        clearInterval(this.timer);

    }

}
