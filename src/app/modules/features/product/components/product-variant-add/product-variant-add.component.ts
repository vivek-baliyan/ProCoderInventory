import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateProductVariant } from '../../../../../core/models/product/create-product-variant';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-variant-add',
  standalone: false,
  templateUrl: './product-variant-add.component.html',
  styleUrl: './product-variant-add.component.css',
})
export class ProductVariantAddComponent implements OnInit {
  @Output() variantsAdded = new EventEmitter<CreateProductVariant[]>();

  productVariants: CreateProductVariant[] = [];
  isSubmitting = false;
  formErrors: any = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    // Simplified form since we're adding variants directly when images are uploaded
  }

  onFileSelected(file: string): void {
    // Add a new variant automatically when an image is uploaded
    const newVariant: CreateProductVariant = {
      id: this.productVariants.length + 1, // Incremental ID for demo purposes
      image: file,
      tagName: '',
      color: '#000000',
      quantity: 1,
    };

    this.productVariants.push(newVariant);
    this.formErrors['image'] = null;
  }

  resetForm(): void {
    this.formErrors = {};
  }

  removeVariant(index: number): void {
    this.productVariants.splice(index, 1);
  }

  updateVariantTagName(index: number, event: any): void {
    this.productVariants[index].tagName = event.target.value;
  }

  updateVariantColor(index: number, event: any): void {
    this.productVariants[index].color = event.target.value;
  }

  updateVariantQuantity(index: number, event: any): void {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      this.productVariants[index].quantity = value;
    }
  }

  onSubmit(): void {
    // First check if there are any variants
    if (this.productVariants.length === 0) {
      this.formErrors['general'] = 'Please add at least one product variant';
      return;
    }

    // Validate all variants
    const invalidVariants = this.productVariants.filter(
      (variant) => !variant.tagName.trim()
    );
    if (invalidVariants.length > 0) {
      this.formErrors['general'] = 'Please enter tag names for all variants';
      return;
    }

    this.isSubmitting = true;

    this.variantsAdded.emit(this.productVariants);
  }
}
