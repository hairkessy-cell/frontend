import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../models/product.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  protected product = signal<ProductResponse | null>(null);
  protected loading = true;
  protected selectedImageIndex = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private productService: ProductService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(product => {
        if (product) {
          this.product.set(product);
        }
        this.loading = false;
      });
    }
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  getSelectedAttribute(attributeName: string): string | null {
    const product = this.product();
    if (!product) return null;
    const attr = product.attributes.find(a => a.attributeName === attributeName);
    return attr?.attributeValue || null;
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }
}

