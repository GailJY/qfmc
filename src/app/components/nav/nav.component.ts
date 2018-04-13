import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {

    	(function(){
    		$('.back,.qf-nav-cover').click(function(){
    			$('.qf-nav').animate({left: '-6.4375rem'}).hide(100);
    			$('.qf-nav-cover').animate({opacity: '0'}).hide(100);
    		})
    	})();
    }

    pinpai(){
        $('.qf-nav-level2').show().animate({left:0}).css("visibility","visible");
        $('.qf-nav-bar').show().animate({marginLeft:'-6.640625rem'})
        $('.back').hide()
        $(this).attr('id')
    }
    fuzhuang(){
         $('.qf-nav-level2-1').show().animate({left:0}).css("visibility","visible");
         $('.qf-nav-bar').show().animate({marginLeft:'-6.640625rem'})
         $('.back').hide()
    }
    back(){
        $(".qf-nav-level2").show().animate({left:'6.640625rem'});
        $(".qf-nav-level2-1").show().animate({left:'6.640625rem'});
        $('.qf-nav-bar').show().animate({marginLeft:0})
        $('.back').show()
    }

    hide(){
        $('.qf-nav').animate({left: '-6.4375rem'}).hide(100);
        $('.qf-nav-cover').animate({opacity: '0'}).hide(100);
    }


    tohome(){
        this.hide();
        this.back();
        this.router.navigate(['/']);
    }

    tolist(){
        this.back();
        this.hide();
        this.router.navigate(['/list']);
    }

    tosort(e){
        this.hide();
        this.back();
        this.router.navigate(['/list'], {queryParams: {sort: $(e.target).text()}});
    }
    gotoregister(){
         this.router.navigate(['/register']);        
    }
    
    gotologin(){
          this.router.navigate(['/login']);        
    }



}
