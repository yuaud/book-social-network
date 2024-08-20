import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services/book.service';
import { Router, RouterLink } from '@angular/router';
import { PageResponseBookResponse } from '../../../../services/models/page-response-book-response';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { BookResponse } from '../../../../services/models';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [CommonModule, BookCardComponent, RouterLink],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.findAllBooks();
  }
  
  private findAllBooks() {
   this.bookService.findAllBooksByOwner({
    page: this.page,
    size: this.size
   }).subscribe({
    next: (books) => {
      this.bookResponse = books;
    }
   });
  }

  goToFirstPage(): void {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage(): void {
    this.page--;
    this.findAllBooks();
  }

  goToPage(page: number): void {
    this.page = page;
    this.findAllBooks();
  }

  goToNextPage(){
    this.page++;
    this.findAllBooks();
  }

  goToLastPage(){
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number -1;
  }

  archiveBook(book: BookResponse): void {
    this.bookService.updateArchivedStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    })
  }

  shareBook(book: BookResponse): void {
    this.bookService.updateShareableStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    });
  }
  
  editBook(book: BookResponse): void {
    this.router.navigate(['books', 'manage', book.id]);
  }

}
