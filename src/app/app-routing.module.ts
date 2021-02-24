import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    component: ItemsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signin',
    component: SignupComponent
  },
  {
    path: 'items/:id',
    component: ItemDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
