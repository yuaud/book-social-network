import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookRequest, BookResponse } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../../../services/services';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit{

  bookRequest: BookRequest = {authorName: '', isbn: '', synopsis: '', title: ''};
  errorMsg: Array<string> = [];
  selectedPicture: string | undefined = '';
  selectedBookCover: any;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if(bookId){
      this.bookService.findBookById({
        'book-id': bookId
      }).subscribe({
        next: (book:BookResponse) => {
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            authorName: book.authorName as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable
          }
          if(book.cover) {
            this.selectedPicture = 'data:image/jpg;base64,'+book.cover
          }
        }
      })
    }
  }


  onFileSelected(file: any): void {
    this.selectedBookCover = file.target.files[0];
    console.log(this.selectedBookCover);
    if(this.selectedBookCover){
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe( {
      next: (bookId) => {
        this.bookService.uploadBookCoverPicture({
          'book-id': bookId,
          body:{
            file: this.selectedBookCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/books/my-books']);
          }
        })
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

}
