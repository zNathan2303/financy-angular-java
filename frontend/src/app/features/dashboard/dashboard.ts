import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../../shared/components/layout/header/header';
import { LucideAngularModule, Wallet, CircleArrowUp, CircleArrowDown } from 'lucide-angular';
import { RecentTransactions } from './recent-transactions/recent-transactions';
import { CurrencyPipe } from '@angular/common';
import { TotalPerCategory } from './total-per-category/total-per-category';
import { DashboardService } from './api/dashboard-service';
import { Category, Transaction } from './api/dashboard-model';
import { LoadingService } from '../../shared/services/loading-service';

@Component({
  selector: 'app-dashboard-page',
  imports: [Header, LucideAngularModule, RecentTransactions, CurrencyPipe, TotalPerCategory],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  readonly Wallet = Wallet;
  readonly CircleArrowUp = CircleArrowUp;
  readonly CircleArrowDown = CircleArrowDown;

  private dashboardService = inject(DashboardService);
  private loadingService = inject(LoadingService);

  numberFormatBRL = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 });

  totalBalance = signal(0);
  monthlyIncome = signal(0);
  monthlyExpense = signal(0);
  recentTransactions = signal<Transaction[]>([]);
  categoryTotalAmount = signal<Category[]>([]);

  ngOnInit() {
    this.loadingService.show();

    this.dashboardService.getData().subscribe({
      next: (res) => {
        this.totalBalance.set(res.totalBalance);
        this.monthlyIncome.set(res.monthlyIncome);
        this.monthlyExpense.set(res.monthlyExpenses);
        this.recentTransactions.set(res.recentTransactions);
        this.categoryTotalAmount.set(res.topCategories);
      },
      error: (err) => {
        alert('Ocorreu um erro ao carregar os dados do dashboard');
        console.log(err);
      },
      complete: () => {
        this.loadingService.hide();
      },
    });
  }
}
