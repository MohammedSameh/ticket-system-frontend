import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { PaginatedList } from '../models/paginated-list.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = `${environment.ticketsUrl}tickets`;

  constructor(private http: HttpClient) {}

  getTickets(pageNumber: number, pageSize: number): Observable<PaginatedList<Ticket>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PaginatedList<Ticket>>(this.baseUrl, { params });
  }

  createTicket(ticket: Partial<Ticket>): Observable<number> {
    return this.http.post<number>(this.baseUrl, ticket);
  }

  handleTicket(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/handle/${id}`, {});
  }
}
