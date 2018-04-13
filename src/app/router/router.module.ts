import {RouterModule, Routes} from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { ListComponent } from '../components/list/list.component';
import { DetailComponent } from '../components/detail/detail.component';


import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { MycountComponent } from '../components/mycount/mycount.component';
import {MycountdetailsComponent } from '../components/mycountdetails/mycountdetails.component';
import {AddressComponent } from '../components/address/address.component';
import {MydreamComponent } from '../components/mydream/mydream.component';
import {MyreadComponent } from '../components/myread/myread.component';
import {OrderComponent } from '../components/order/order.component';

import { BuycarComponent } from '../components/buycar/buycar.component';
import { Buycar2Component } from '../components/buycar2/buycar2.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'list', component: ListComponent},
    {path: 'detail/:id', component: DetailComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'mycount', component: MycountComponent},
    {path: 'address', component: AddressComponent },
    {path: 'mydream', component: MydreamComponent},
    {path: 'myread', component: MyreadComponent},
    {path: 'order', component: OrderComponent },
    {path: 'mycountdetails', component: MycountdetailsComponent}, 
     {path:'buycar',component: BuycarComponent},
    {path:'buycar2',component: Buycar2Component},
    {path: '**', component: HomeComponent}
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    {enableTracing: false}
)