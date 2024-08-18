import { Routes } from '@angular/router';
import { LearnapiComponent } from './sharedComponent/learnapi/comments.component';

export const routes: Routes = [
    {path: 'comments', component: LearnapiComponent, canActivate: [() => { 
        let loggedInValue = localStorage.getItem('loggedIn')
        if(loggedInValue === 'true'){
            return true
        } else {
            return false   
        }
      
    }]},
    {path: '**', redirectTo: '' }
];
