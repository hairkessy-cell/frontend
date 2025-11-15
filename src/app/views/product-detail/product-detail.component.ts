import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../models/product.model';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

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
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(product => {
        if (product) {
          this.product.set(product);
          this.setupSEO(product);
        }
        this.loading = false;
      });
    }
  }

  private setupSEO(product: ProductResponse): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const productUrl = `/product/${product.id}`;
    const productImage = product.images && product.images.length > 0 
      ? product.images[0].url 
      : '/assets/images/logo.svg';
    const fullImageUrl = productImage.startsWith('http') 
      ? productImage 
      : `https://hairkessy.com${productImage}`;
    
    const description = product.description || 
      `${product.title} - Premium quality hair product from ${brandName}. ${product.brand ? `Brand: ${product.brand}` : ''}`;
    
    const keywords = [
      product.title,
      product.brand,
      product.categoryName,
      product.color,
      'hair extensions',
      'hair products',
      brandName
    ].filter(Boolean).join(', ');

    // Set hreflang tags
    this.seoService.setHreflangTags([
      { lang: 'en', url: productUrl },
      { lang: 'tr', url: `${productUrl}?lang=turkish` },
      { lang: 'ru', url: `${productUrl}?lang=russian` }
    ]);

    // Set SEO data
    this.seoService.setSEOData({
      title: `${product.title} - ${brandName}`,
      description: description,
      keywords: keywords,
      url: productUrl,
      type: 'product',
      image: productImage,
      structuredData: this.createProductSchema(product, fullImageUrl)
    });
  }

  private createProductSchema(product: ProductResponse, imageUrl: string): any {
    const availability = product.quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';
    const price = product.onsale && product.salePrice < product.listPrice 
      ? product.salePrice 
      : product.listPrice;
    
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description || product.title,
      image: product.images && product.images.length > 0 
        ? product.images.map(img => img.url.startsWith('http') ? img.url : `https://hairkessy.com${img.url}`)
        : [imageUrl],
      brand: {
        '@type': 'Brand',
        name: product.brand || 'HAIRKESSY'
      },
      offers: {
        '@type': 'Offer',
        url: `https://hairkessy.com/product/${product.id}`,
        priceCurrency: 'TRY',
        price: price,
        availability: availability,
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      sku: product.productCode?.toString() || product.id,
      mpn: product.barcode || product.productCode?.toString()
    };

    if (product.categoryName) {
      schema.category = product.categoryName;
    }

    if (product.color) {
      schema.color = product.color;
    }

    return schema;
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

