import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestionbook';
  constructor() {
    const config = {
  apiKey: "AIzaSyDUnElC3WHGzq2cnEnupirF7WV7HzGe0g8",
  authDomain: "gestionbook6.firebaseapp.com",
  projectId: "gestionbook6",
  storageBucket: "gestionbook6.appspot.com",
  messagingSenderId: "16331646455",
  appId: "1:16331646455:web:586acc3389c3bf8d1a7af2"
    };
    firebase.initializeApp(config);
  }
}
