import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { authGuard } from './guard/auth.guard';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';
//import { LazyLoadingFirstComponent } from './components/lazy-loading-first/lazy-loading-first.component';
export const routes: Routes = [
    
    {   path: 'home',
        component: HomeComponent,
        canActivate : [authGuard],
        data: { roles : ["Admin,Student"]}
    },
    {   path: 'edit/:id', 
        component: EditStudentComponent,
        canActivate : [authGuard],
        data: { roles : ["Admin"]}
    },
    {path: 'login', component: LoginComponent},
    {path: 'signup', component : SignupComponent},
    {
        path: 'addstudent',
        component : AddStudentComponent ,
        canActivate : [authGuard],
        data: { roles : ["Admin"]}
    },
    {   
        path: 'edit', 
        component: EditStudentComponent,
        canActivate : [authGuard],
        data: { roles : ["Admin"]}
    },

    {path: 'LazyLoad', 
    loadComponent :
     () => import("./components/lazy-loading-first/lazy-loading-first.component").then( c => c.LazyLoadingFirstComponent)
    },
    {path: 'unauthorized', component: UnAuthorizedComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component : PageNotFoundComponent},
    


];
