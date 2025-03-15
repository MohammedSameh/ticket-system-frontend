export interface Ticket {
  id: number;
  created: string;
  phoneNumber: string;
  governorate: string;
  city: string;
  district: string;
  status: string; // "New" or "Handled"
}
