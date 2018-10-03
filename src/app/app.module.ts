import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { userPasswordConfirm } from './user_password_confirm.directive';
//Add formsmodule
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { FollowingComponent } from './main/following/following.component';
import { HeadlineComponent } from './main/headline/headline.component';
import { PostsComponent } from './main/posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    userPasswordConfirm,
    FollowingComponent,
    HeadlineComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    //imports formsmodule
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
