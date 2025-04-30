import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisibilityStatuses } from '../../../../../core/enums/visibility-status.enum';
import { CategoryDropdown } from '../../../../../core/models/category/categoryDropdown';
import { NotificationService } from '../../../../../core/services/notification.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../../core/models/category/category';
import { ActivatedRoute } from '@angular/router';
import { UpdateCategory } from '../../../../../core/models/category/update-category';

@Component({
  selector: 'app-category-edit',
  standalone: false,
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css',
})
export class CategoryEditComponent implements OnInit {
  categoryImageBase64: string | null = null;

  statusOptions = Object.entries(VisibilityStatuses).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  updateCategoryForm!: FormGroup;

  parentCategories: CategoryDropdown[] = [];

  category!: Category;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getParentCategories();

    // Access the resolved data
    this.category = this.route.snapshot.data['category'].data;

    this.categoryImageBase64 = this.category.categoryImages?.length
      ? this.category.categoryImages[0].image
      : '';

    this.initializeForm();
  }

  initializeForm() {
    //get publish date and time from the category object
    const publishDate = this.category.publishDate
      ? new Date(this.category.publishDate).toISOString().split('T')[0]
      : '';

    const publishTime = this.category.publishDate
      ? new Date(this.category.publishDate)
          .toTimeString()
          .split(' ')[0]
          .split(':')
          .slice(0, 2)
          .join(':')
      : '';

    this.updateCategoryForm = this.formBuilder.group({
      name: [this.category.name, Validators.required],
      pageTitle: [this.category.pageTitle, Validators.required],
      urlIdentifier: [this.category.urlIdentifier],
      description: [this.category.description],
      parentCategory: [this.category.parentCategoryId],
      image: [],
      visibilityStatus: [String(this.category.status)],
      publishDate: [publishDate],
      publishTime: [publishTime],
    });
  }

  getParentCategories() {
    this.categoryService.getCategoriesForDropdown().subscribe((response) => {
      this.parentCategories = response.data;
    });
  }

  onFileSelected(imageBase64: string) {
    this.updateCategoryForm.patchValue({ image: imageBase64 });
  }

  onSubmit() {
    if (this.updateCategoryForm.valid) {
      const formData = this.updateCategoryForm.value;

      const publishDateTime = this.getPublishDateTime(
        formData.publishDate,
        formData.publishTime
      );

      const categoryData: UpdateCategory = {
        categoryId: this.category.id,
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
        .updateCategory(categoryData)
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
