export interface Transaction {
  id: number;
  description: string;
  date: string;
  value: number;
  income: boolean;
  category: {
    id: number;
    title: string;
    description: string;
    color: string;
    icon: string;
  };
}
