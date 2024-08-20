import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services/book.service';
import { PageResponseBorrowedBookResponse } from '../../../../services/models/page-response-borrowed-book-response';
import { BorrowedBookResponse } from '../../../../services/models';

@Component({
  selector: 'app-return-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.scss'
})
export class ReturnBooksComponent implements OnInit{
  returnedBooks: PageResponseBorrowedBookResponse = {};
  page: number = 0;
  size: number = 5;
  message: string = '';
  level: string = 'success';


  constructor(
    private bookService: BookService,
  ){

  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if(!book.returned){
      this.level = 'error';
      this.message = 'The book is not yet returned';
      return;
    }
    this.bookService.approveReturnBorrowedBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book return approved.';
        this.findAllReturnedBooks();
      }
    });
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (res) => {
        this.returnedBooks = res;
      }
    })
  }

  goToFirstPage(): void {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage(): void {
    this.page--;
    this.findAllReturnedBooks();
  }

  goToPage(page: number): void {
    this.page = page;
    this.findAllReturnedBooks();
  }

  goToNextPage(){
    this.page++;
    this.findAllReturnedBooks();
  }

  goToLastPage(){
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllReturnedBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.returnedBooks.totalPages as number -1;
  }
}
