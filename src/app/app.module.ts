import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { CacheformComponent } from './cacheform/cacheform.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { ClassementComponent } from './classement/classement.component';
import { CacheinfoComponent } from './cacheinfo/cacheinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    SignupComponent,
    CacheformComponent,
    NavbarComponent,
    CacheinfoComponent,
    ClassementComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'home', component: HomeComponent},
      {path: 'cacheform', component: CacheformComponent},
      {path: 'cacheinfo', component: CacheinfoComponent},
      {path: 'navbar', component: NavbarComponent},
      {path: 'classement', component: ClassementComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
    BrowserAnimationsModule,
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(faHouse);
    library.addIcons(faRightToBracket);
    library.addIcons(faRightFromBracket);
    library.addIcons(faBars);
    library.addIcons(faXmark);
    library.addIcons(faRankingStar);
    library.addIcons(faFileLines);
  }
}
