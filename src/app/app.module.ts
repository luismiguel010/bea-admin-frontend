import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterUserPipe } from './pages/users/filter-users.pipe';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './pages/users/users.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobModalComponent } from './modals/job-modal/job-modal.component';
import { JobCreateModalComponent } from './modals/job-create-modal/job-create-modal.component';
import { CapacitacionesComponent } from './pages/capacitaciones/capacitaciones.component';
import { CapacitacionModalComponent } from './modals/capacitacion-modal/capacitacion-modal.component';
import { CapacitacionUpdateModalComponent } from './modals/capacitacion-update-modal/capacitacion-update-modal.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'users', component: UsersComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'capacitaciones', component: CapacitacionesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    UsersComponent,
    JobsComponent,
    FilterUserPipe,
    JobModalComponent,
    JobCreateModalComponent,
    CapacitacionesComponent,
    CapacitacionModalComponent,
    CapacitacionUpdateModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MdbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
