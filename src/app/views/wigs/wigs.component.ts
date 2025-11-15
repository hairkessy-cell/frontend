import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../models/product.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-wigs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './wigs.component.html',
  styleUrl: './wigs.component.scss'
})
export class WigsComponent implements OnInit {
  protected products: ProductResponse[] = [];
  protected allProducts: ProductResponse[] = [];
  protected loading = true;
  protected searchQuery = '';

  constructor(
    private productService: ProductService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.productService.getProductsByCategory('Wigs', 0, 20).subscribe(response => {
      this.allProducts = response.content;
      this.filterProducts();
      this.loading = false;
    });
  }

  onSearchChange(): void {
    this.filterProducts();
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

