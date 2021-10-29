import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (resp:any) => {
            resolve(resp);
          },
          (error:any) => {
            reject(error);
          }
        );
      }
    );
  }
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (resp:any) => {
            resolve(resp);
          },
          (error:any) => {
            reject(error);
          }
        );
      }
    );
 }
 signOutUser() {
  firebase.auth().signOut();
 }
}
