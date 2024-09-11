export type Row = {
    idInvoice: number;
    date: string | null;
    name: string | null;
    email: string | null;
    serviceType: string;
    status: 'Pending' | 'Cancel' | 'Complete';
  };