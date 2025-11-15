import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ProductService } from '../../services/product.service';
import { SEOService } from '../../services/seo.service';
import { ProductResponse } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  protected featuredProducts: ProductResponse[] = [];
  protected customerAvatars: string[] = [];

  constructor(
    private languageService: LanguageService,
    private productService: ProductService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
    
    this.productService.getProducts(0, 8).subscribe(response => {
      this.featuredProducts = response.content;
    });

    // Use placeholder images of real people for customer avatars
    this.customerAvatars = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    ];
  }

  private setupSEO(): void {
    const lang = this.languageService.getCurrentLanguage();
    const brandName = this.languageService.getTranslation('common.brandName');
    const headline = this.languageService.getTranslation('hero.headline');
    const description = this.languageService.getTranslation('hero.description');
    
    // Set hreflang tags
    this.seoService.setHreflangTags([
      { lang: 'en', url: '/' },
      { lang: 'tr', url: '/?lang=turkish' },
      { lang: 'ru', url: '/?lang=russian' }
    ]);

    // Set SEO data
    this.seoService.setSEOData({
      title: `${brandName} - ${headline}`,
      description: description || `${brandName} - Premium quality hair products, wigs, and extensions for professionals and individuals.`,
      keywords: 'hair extensions, wigs, synthetic hair, hair accessories, hair products, professional hair, hair extensions materials, braid hair, afro hair',
      url: '/',
      type: 'website',
      image: '/assets/images/logo.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: brandName,
        url: 'https://hairkessy.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://hairkessy.com/?search={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      }
    });
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }
}

