import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, FeedbackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { BookService, FeedbackService } from '../../../../services/services';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '../../components/rating/rating.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingComponent, RouterLink],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit {
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: '', note: 0};
  page: number = 0;
  size: number = 5;
  selectedBook: BorrowedBookResponse | undefined = undefined;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ){

  }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  returnBorrowedBook(book: BorrowedBookResponse): void {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (res) => {
        this.borrowedBooks = res;
      }
    })
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowedBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: () => {
        if(withFeedback){
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    });
  }

  private giveFeedback(): void {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {

      }
    });
  }


  goToFirstPage(): void {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage(): void {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(page: number): void {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToNextPage(){
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage(){
    this.page = this.borrowedBooks.totalPages as number - 1;
    this.findAllBorrowedBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.borrowedBooks.totalPages as number -1;
  }

}
