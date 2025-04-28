import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../core/models/category/category';
import { CategoryService } from '../../services/category.service';
import { CategoryListItem } from '../../../../../core/models/category/category-list-item';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categoories: CategoryListItem[] = [];

  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.getCategories(1, 10).subscribe((response) => {
      this.categoories = response.data;
    });
  }
}
