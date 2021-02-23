import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CartComponent } from './cart/cart.component';
import { CartPreviewComponent } from './nav-bar/cart-preview/cart-preview.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './store/app.reducer';

import * as fromUser from './user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CartComponent,
    CartPreviewComponent,
    SignupComponent,
    LoginComponent,
    ItemsComponent,
    ItemDetailComponent
  ],
  imports: [
    StoreModule.forRoot(fromApp.appReducer),
    // StoreModule.forRoot(fromUser.userReducer),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
