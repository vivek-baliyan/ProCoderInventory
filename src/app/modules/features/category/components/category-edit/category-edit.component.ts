import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisibilityStatuses } from '../../../../../core/enums/visibility-status.enum';
import { CategoryDropdown } from '../../../../../core/models/category/categoryDropdown';
import { CreateCategory } from '../../../../../core/models/category/create-category';
import { NotificationService } from '../../../../../core/services/notification.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-edit',
  standalone: false,
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css',
})
export class CategoryEditComponent implements OnInit {
  imageChangedEvent: Event | null = null;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  originalImageData: string = '';

  visibilityStatuses = Object.entries(VisibilityStatuses).map(
    ([key, value]) => ({
      label: key,
      value: value,
    })
  );

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

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;

    // Store the original image data
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];

      // Read and store the original image as base64
      const reader = new FileReader();
      reader.onload = () => {
        this.originalImageData = reader.result as string;

        this.createCategoryForm.get('image')?.setValue(this.originalImageData);
      };
      reader.readAsDataURL(this.selectedFile);
    }
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
