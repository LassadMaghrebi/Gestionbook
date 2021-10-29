import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book: any;

  constructor(private route: ActivatedRoute, private booksService: BooksService,
              private router: Router) {}

  ngOnInit() {
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (book: any) => {
        this.book = book;
        console.log(this.book)
      }
      
    );
  }

  onBack() {
    this.router.navigate(['/books']);
  }
}