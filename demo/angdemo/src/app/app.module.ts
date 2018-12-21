import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { HomeComponent } from './home/home.component';
import { AddempComponent } from './home/addemp/addemp.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { ConfirmationDialogComponent } from './confirmationdialog/confirmationdialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditempComponent } from './home/editemp/editemp.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserprofileComponent } from './home/userprofile/userprofile.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import {SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider} from "angular-6-social-login";
import { CustomepipePipe } from './_pipe/customepipe.pipe';
import { FormsModule } from '@angular/forms';
//import {AngularFireModule} from 'angularfire2';
//import {AngularFireAuthModule} from 'angularfire2/auth';
//import { environment } from '../environments/environment';
//import { JwPaginationComponent } from 'jw-angular-pagination';
const appRoutes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'addemp', component: AddempComponent,canActivate: [AuthGuard]  },
  { path: 'editemp', component: EditempComponent,canActivate: [AuthGuard]  },
  { path: 'userprofile', component: UserprofileComponent,canActivate: [AuthGuard]  },
  { path: 'userprofile', component: UserprofileComponent,canActivate: [AuthGuard]  },
  { path: 'forgotpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("495232484279749")
        }
      ]
  );
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddempComponent,
    ConfirmationDialogComponent,
    EditempComponent,
    HeaderComponent,
    FooterComponent,
    UserprofileComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    CustomepipePipe,
   // JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    SocialLoginModule,
    FormsModule
   // AngularFireModule.initializeApp(environment.firebase),
    //AngularFireAuthModule
  ],
  providers: [ 
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class AppModule { }
