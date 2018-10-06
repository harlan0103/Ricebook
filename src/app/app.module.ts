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
// Register for FollowingService
import { HttpClientModule } from '@angular/common/http';
// Service providers
import { FollowingService } from './main/following/following.service';
import { HeadlineService } from './main/headline/headline.service';
import { PostsService } from './main/posts/posts.service';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule, Router} from '@angular/router';

/*Create route*/
export const route: Routes = [
  {path: '', component: AuthComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'main', component: MainComponent},
  {path: 'profile', component: ProfileComponent}
];

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
    PostsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    // Imports formsmodule
    FormsModule,
    // Import HttpClientModule
    HttpClientModule,
    // Router
    RouterModule.forRoot(route)
  ],
  exports: [
    RouterModule,
  ],
  // import service into app.module
  providers: [FollowingService, HeadlineService, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
