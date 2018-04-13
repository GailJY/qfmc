import { Component, OnInit } from '@angular/core';
import {ComService} from '../../services/com.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private com:ComService,private router: Router) { 

  }

  ngOnInit() {
  		(function(){
  			$('.qf-header_content').click(function(){
	  			$('.qf-nav').show().animate({left: '0'})
	  			$('.qf-nav-cover').show().animate({opacity: '0.7'});

	  			
  			});
  		})()

      
  }

  sh(){
        
        this.com.show = true;
        if(this.com.show){
          $('.qf-search-pupup').show()
        }else{
          $('.qf-search-pupup').hide()
        }
        $('.qf-search-pupup').show().animate({marginTop: 0});
        
       
       
        
    }
    gotoaccount(){
        this.router.navigate(['mycount']);
    }



}
