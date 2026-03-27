export interface Transaction {
  id: number;
  description: string;
  date: string;
  value: number;
  income: boolean;
  category: {
    id: number;
    title: string;
    color: string;
    icon: string;
  };
}

export interface Category {
  id: number;
  title: string;
  color: string;
  itemsCount: number;
  totalValue: number;
}

export interface DashboardModel {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  recentTransactions: Transaction[];
  topCategories: Category[];
}
