export type Row = {
    // id(id: any): void;
    // idInvoice: number;
    id: number;
    date: string | null;
    name: string | null;
    email: string | null;
    serviceType: string;
    status: 'Pending' | 'Cancel' | 'Complete';
  };