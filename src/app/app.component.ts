import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth, private route: Router, private cdr: ChangeDetectorRef){
  }


  isLoggedIn: boolean = false;
  userName : string | null = '';
  userImage = '';
  user: any;

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if(!!user){
      this.user = JSON.parse(user);
    }
    if(this.user){
      this.isLoggedIn = true;
      this.userName = this.user.displayName ?? '';
      this.userImage = this.user.photoURL ?? '';
      this.cdr.detectChanges()
      this.route.navigate(['comments'])
    } else{
      this.isLoggedIn = false;
    }
  }


   login(){
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(result => {
      console.log('User signed in:', result.user);
      if(result.user){
        
           this.userName = result.user.displayName ?? '';
           this.userImage = result.user.photoURL ?? '';
           localStorage.setItem('user', JSON.stringify(result.user));
           localStorage.setItem('loggedIn', 'true')
           this.isLoggedIn = true;
           this.route.navigate(['comments'])
      }    
    })
    .catch(error => {
      console.error('Sign in error:', error);
      alert('Sign in error');
    });
    
   }

   signOut(){
    this.isLoggedIn = false;
    this.userName = '';
    this.userImage = '';
    localStorage.removeItem('user');
    localStorage.setItem('loggedIn', 'false')
    this.route.navigate([''])
   }

}
