import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CreateCategory } from '../../../../../core/models/category/create-category';
import { NotificationService } from '../../../../../core/services/notification.service';
import { CategoryDropdown } from '../../../../../core/models/category/category-dropdown';
import { VisibilityStatuses } from '../../../../../core/enums/visibility-status.enum';

@Component({
  selector: 'app-category-add',
  standalone: false,
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css',
})
export class CategoryAddComponent implements OnInit {
  statusOptions = Object.entries(VisibilityStatuses).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  createCategoryForm!: FormGroup;

  parentCategories: CategoryDropdown[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getParentCategories();

    this.initializeForm();
  }

  initializeForm() {
    this.createCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      pageTitle: ['', Validators.required],
      urlIdentifier: [''],
      description: [''],
      parentCategory: [0],
      image: [],
      visibilityStatus: ['0'],
      publishDate: [''],
      publishTime: [''],
    });
  }

  getParentCategories() {
    this.categoryService.getCategoriesForDropdown().subscribe((response) => {
      this.parentCategories = response.data;
    });
  }

  onFileSelected(imageBase64: string) {
    this.createCategoryForm.patchValue({ image: imageBase64 });
  }

  onSubmit() {
    if (this.createCategoryForm.valid) {
      const formData = this.createCategoryForm.value;

      const publishDateTime = this.getPublishDateTime(
        formData.publishDate,
        formData.publishTime
      );

      const categoryData: CreateCategory = {
        name: formData.name,
        pageTitle: formData.pageTitle,
        urlIdentifier: formData.urlIdentifier,
        description: formData.description,
        parentCategoryId: formData.parentCategory,
        image: formData.image,
        status: formData.visibilityStatus,
        publishDateTime: publishDateTime,
      };

      this.categoryService
        .createCategory(categoryData)
        .subscribe((response) => {
          this.notificationService.showSuccess(response.message);
        });
    }
  }

  private getPublishDateTime(publishDate: string, publishTime: string) {
    const combinedDateTime = `${publishDate}T${publishTime}:00`;
    const publishDateTime = new Date(combinedDateTime);
    return publishDateTime;
  }
}
