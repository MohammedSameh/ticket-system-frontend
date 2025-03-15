import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../../../services/ticket.service';
import { Ticket } from '../../../../models/ticket.model';
import { PaginatedList } from '../../../../models/paginated-list.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'color', 'created', 'phoneNumber', 'governorate', 'city', 'district', 'status', 'actions'];
  dataSource = new MatTableDataSource<Ticket>();
  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ticketService: TicketService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets(this.pageNumber, this.pageSize).subscribe({
      next: (paginated: PaginatedList<Ticket>) => {
        this.dataSource.data = paginated.items;
        this.totalCount = paginated.totalCount;
      },
      error: (err) => console.error(err)
    });
  }

  handleTicket(id: number): void {
    this.ticketService.handleTicket(id).subscribe({
      next: (id) => {
        this.snackBar.open('Ticket handled successfully!', 'Close', { duration: 3000 });
        this.loadTickets();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to handle ticket. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadTickets();
  }

  getMinutes(creationDate: string): number {
    const created = new Date(creationDate);
    const now = new Date();
    return (now.getTime() - created.getTime()) / 60000;
  }

  getColor(created: string): string {
    const createdDate = new Date(created);
    const now = new Date();
    const minutesElapsed = Math.floor((now.getTime() - createdDate.getTime()) / 60000);
    console.log('created: ', created);
    console.log('minutesElapsed: ', minutesElapsed);

    if (minutesElapsed >= 60) return 'red';
    if (minutesElapsed >= 45) return 'blue';
    if (minutesElapsed >= 30) return 'green';
    if (minutesElapsed < 30) return 'yellow';
    return 'gray';
  }

}
