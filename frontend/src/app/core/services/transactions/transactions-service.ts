import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction, TransactionRequest } from './transaction-model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly pathTransactions = '/financy/v1/transactions';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Transaction[]>(this.pathTransactions);
  }

  create({ categoryId, date, description, income, value }: TransactionRequest) {
    return this.http.post<Transaction>(this.pathTransactions, {
      categoryId,
      date,
      description,
      income,
      value,
    });
  }

  deleteById(id: number) {
    return this.http.delete(`${this.pathTransactions}/${id}`);
  }

  getbyId(id: number) {
    return this.http.get<Transaction>(`${this.pathTransactions}/${id}`);
  }

  update({ categoryId, date, description, income, value }: TransactionRequest, id: number) {
    return this.http.put<Transaction>(`${this.pathTransactions}/${id}`, {
      categoryId,
      date,
      description,
      income,
      value,
    });
  }
}
