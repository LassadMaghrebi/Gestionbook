import { Component, OnInit, Output } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthService } from '../services/auth.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth:boolean=false
  constructor(private booksService: BooksService,private authService:AuthService) {
   }
  books:any
  booksSubscription: any;
  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }
  onSignOut() {
    this.authService.signOutUser();
  }
  recherche(f:string){
    this.booksService.getBooks(f)
  }
}
