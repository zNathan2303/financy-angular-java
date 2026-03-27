import { Component, inject, signal } from '@angular/core';
import { Header } from '../../shared/components/layout/header/header';
import {
  ArrowUpDown,
  LucideAngularModule,
  LucideIconData,
  Plus,
  SquarePen,
  Tag,
  Trash,
  Utensils,
} from 'lucide-angular';
import { LoadingService } from '../../shared/services/loading-service';
import { CategoryService } from '../../core/services/categories/category-service';
import { Category } from '../../core/services/categories/category-model';
import { NgClass } from '@angular/common';
import { CATEGORY_ICONS } from '../../shared/icons/categories';

@Component({
  selector: 'app-categories',
  imports: [Header, LucideAngularModule, NgClass],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  readonly Tag = Tag;
  readonly ArrowUpDown = ArrowUpDown;
  readonly Utensils = Utensils;
  readonly Plus = Plus;
  readonly Trash = Trash;
  readonly SquarePen = SquarePen;

  private categoryService = inject(CategoryService);
  private loadingService = inject(LoadingService);

  totalCategories = signal(0);
  totalTransactions = signal(0);
  mostUsedCategoryTitle = signal('.');

  categories = signal<Category[]>([]);

  ngOnInit() {
    this.loadingService.show();

    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories.set(res);

        this.totalCategories.set(res.length);

        const transactionsCount = res.reduce((acc, category) => {
          return acc + category.itemsCount;
        }, 0);
        this.totalTransactions.set(transactionsCount);

        const mostUsedCategory = res.reduce((acc, category) => {
          return category.itemsCount > acc.itemsCount ? category : acc;
        });
        this.mostUsedCategoryTitle.set(mostUsedCategory.title);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loadingService.hide();
      },
    });
  }

  getCategoryIcon(name: string): LucideIconData {
    return CATEGORY_ICONS[name as keyof typeof CATEGORY_ICONS];
  }
}
