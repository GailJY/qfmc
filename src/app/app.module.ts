import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { RootRouter } from './router/router.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { DatagridComponent } from './components/datagrid/datagrid.component';
import { ListComponent } from './components/list/list.component';
import { RangePipe } from './piges/range/range.pipe';
import { HttpclientService } from './services/httpclient/httpclient.service';
import { DetailComponent } from './components/detail/detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';
import {ComService} from './services/com.service';



import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MycountComponent } from './components/mycount/mycount.component';
import {MycountdetailsComponent } from './components/mycountdetails/mycountdetails.component';
import {AddressComponent } from './components/address/address.component';
import {MydreamComponent } from './components/mydream/mydream.component';
import {MyreadComponent } from './components/myread/myread.component';
import {OrderComponent } from './components/order/order.component';
import {MyadderssService} from './services/myaddress/myadderss.service';


import { BuycarComponent } from './components/buycar/buycar.component';
import { Buycar2Component } from './components/buycar2/buycar2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DatagridComponent,
    ListComponent,
    RangePipe,
    DetailComponent,
    FooterComponent,
    NavComponent,
    SearchComponent,
     RegisterComponent,
    LoginComponent,
    MycountComponent,
    MycountdetailsComponent,
    AddressComponent ,
    MydreamComponent,
    OrderComponent,
    MyreadComponent,
    BuycarComponent,
    Buycar2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RootRouter
  ],
  providers: [HttpclientService,ComService,MyadderssService],
  bootstrap: [AppComponent]
})
export class AppModule { }
