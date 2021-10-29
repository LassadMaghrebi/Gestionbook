import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: any;
  fileIsUploading = false;
  fileUrl: string="";
  fileUploaded = false;
  constructor(private formBuilder: FormBuilder, private booksService: BooksService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }
  
  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book(title, author);
    newBook.synopsis = synopsis;
    if(this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }else{
      newBook.photo =''
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }
  detectFiles(event:any) {
    this.onUploadFile(event.target.files[0]);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.uploadFile(file).then(
     
      (url: any) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        
      }
    );
  }
  val=0
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        let byte=0
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (x) => {
            
            console.log('Chargement…',Math.round(x.bytesTransferred/x.totalBytes*100),'%');
            this.val=Math.round(x.bytesTransferred/x.totalBytes*100)
            //console.log(Math.trunc(x.totalBytes/(1024*1024)))
            console.log(x.bytesTransferred/(1024*1024)-byte)
            byte=x.bytesTransferred/(1024*1024)
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}

