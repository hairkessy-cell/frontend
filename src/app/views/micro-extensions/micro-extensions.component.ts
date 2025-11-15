import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-micro-extensions',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="microExtensions.title"
      subtitleKey="microExtensions.subtitle"
      searchPlaceholderKey="microExtensions.searchPlaceholder"
      noResultsKey="microExtensions.noResults"
      categoryName="Micro Extensions"
    />
  `
})
export class MicroExtensionsComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('microExtensions.title');
    const subtitle = this.languageService.getTranslation('microExtensions.subtitle');
    const url = '/micro-extensions';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium micro extensions at ${brandName}. High-quality micro hair extensions for seamless styling.`,
      keywords: 'micro extensions, micro hair extensions, micro link extensions, professional micro extensions',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

