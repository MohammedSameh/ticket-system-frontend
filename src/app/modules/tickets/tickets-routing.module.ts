import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketCreateComponent } from './components/ticket-create/ticket-create.component';

const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: 'create', component: TicketCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
