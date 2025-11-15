import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../models/product.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss',
})
export class ProductListingComponent implements OnInit {
  @Input() titleKey!: string;
  @Input() subtitleKey!: string;
  @Input() searchPlaceholderKey!: string;
  @Input() noResultsKey!: string;
  @Input() categoryName?: string;

  protected products: ProductResponse[] = [];
  protected paginatedProducts: ProductResponse[] = [];
  protected allProducts: ProductResponse[] = [];
  protected loading = true;
  protected searchQuery = '';
  protected currentPage = 1;
  protected itemsPerPage = 25;
  protected totalPages = 1;

  constructor(
    private productService: ProductService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.filterProducts();
  }

  private loadProducts(): void {
    this.loading = true;
    if (this.categoryName) {
      this.productService
        .getProductsByCategory(this.categoryName, 0, 100)
        .subscribe((response) => {
          this.allProducts = response.content;
          this.filterProducts();
          this.loading = false;
        });
    } else {
      this.productService.getProducts(0, 100).subscribe((response) => {
        this.allProducts = response.content;
        this.filterProducts();
        this.loading = false;
      });
    }
  }

  private filterProducts(): void {
    if (!this.searchQuery.trim()) {
      this.products = this.allProducts;
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.products = this.allProducts.filter((product) => {
        const titleMatch = product.title?.toLowerCase().includes(query);
        const descriptionMatch = product.description
          ?.toLowerCase()
          .includes(query);
        const brandMatch = product.brand?.toLowerCase().includes(query);
        const colorMatch = product.color?.toLowerCase().includes(query);

        return titleMatch || descriptionMatch || brandMatch || colorMatch;
      });
    }

    this.updatePagination();
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const maxVisible = 7;

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 3) {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(this.totalPages);
      }
    }

    return pages;
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
