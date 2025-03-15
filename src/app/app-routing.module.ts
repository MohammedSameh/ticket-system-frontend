import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  {
    path: 'tickets',
    loadChildren: () => import('./modules/tickets/tickets.module').then(m => m.TicketsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
