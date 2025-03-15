import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../../../services/ticket.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.scss']
})
export class TicketCreateComponent {
  ticketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.ticketForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      governorate: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      this.ticketService.createTicket(this.ticketForm.value).subscribe({
        next: (id) => {
          this.snackBar.open('Ticket created successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/tickets']);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to create ticket. Please try again.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please fix validation errors before submitting.', 'Close', { duration: 3000 });
    }
  }

  onBack(): void {
    this.router.navigate(['/tickets']);
  }
}
