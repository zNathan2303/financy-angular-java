import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryRequest } from './category-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Category[]>('/financy/v1/categories');
  }

  create({ title, description, color, icon }: CategoryRequest) {
    return this.http.post<Category>('/financy/v1/categories', {
      title,
      description,
      color,
      icon,
    });
  }
}
