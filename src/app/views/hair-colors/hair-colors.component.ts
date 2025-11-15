import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../models/product.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hair-colors',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './hair-colors.component.html',
  styleUrl: './hair-colors.component.scss'
})
export class HairColorsComponent implements OnInit {
  protected products: ProductResponse[] = [];
  protected allProducts: ProductResponse[] = [];
  protected loading = true;
  protected selectedColor = 'all';
  protected searchQuery = '';

  constructor(
    private productService: ProductService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  filterByColor(color: string): void {
    this.selectedColor = color;
    this.loading = true;
    this.loadProducts();
  }

  onSearchChange(): void {
    this.filterProducts();
  }

  private loadProducts(): void {
    if (this.selectedColor === 'all') {
      this.productService.getProducts(0, 30).subscribe(response => {
        this.allProducts = response.content;
        this.filterProducts();
        this.loading = false;
      });
    } else {
      this.productService.getProductsByColor(this.selectedColor, 0, 30).subscribe(response => {
        this.allProducts = response.content;
        this.filterProducts();
        this.loading = false;
      });
    }
  }

  private filterProducts(): void {
    if (!this.searchQuery.trim()) {
      this.products = this.allProducts;
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.products = this.allProducts.filter(product => {
      const titleMatch = product.title?.toLowerCase().includes(query);
      const descriptionMatch = product.description?.toLowerCase().includes(query);
      const brandMatch = product.brand?.toLowerCase().includes(query);
      const colorMatch = product.color?.toLowerCase().includes(query);
      
      return titleMatch || descriptionMatch || brandMatch || colorMatch;
    });
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }
}

