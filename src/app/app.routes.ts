import { Routes } from '@angular/router';
import path from 'node:path';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { BrandsComponent } from './component/brands/brands.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { ProductsComponent } from './component/products/products.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { DetailsComponent } from './component/details/details.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { AllOrdersComponent } from './component/all-orders/all-orders.component';
import { OrdersComponent } from './component/orders/orders.component';

export const routes: Routes = [
    
    { path: "", component: AuthLayoutComponent,canActivate:[authGuard], children: [
        { path: "", redirectTo: "login", pathMatch: 'full' }, 
        { path: "login", component: LoginComponent },
        { path: "register", component: RegisterComponent },
        {path:"forget",component:ForgetpasswordComponent
        }
    ]},
    { path: "", component: BlankLayoutComponent, children: [
        { path: "home", component: HomeComponent },
        { path: 'brands', component: BrandsComponent },
        { path: 'cart', component: CartComponent },
        { path: 'categories', component: CategoriesComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'details/:id', component: DetailsComponent },
        {path:"allorders",component:AllOrdersComponent},
        { path: 'orders/:id', component: OrdersComponent},
        { path: '', redirectTo: '/brands', pathMatch: 'full' }, // إعادة التوجيه إلى /brands عند الوصول إلى المكون الرئيسي
        { path: '**', component: NotFoundComponent } // مسار الخطأ 404
    ]}
];

