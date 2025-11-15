import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-synthetic-hair',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="syntheticHair.title"
      subtitleKey="syntheticHair.subtitle"
      searchPlaceholderKey="syntheticHair.searchPlaceholder"
      noResultsKey="syntheticHair.noResults"
      categoryName="Synthetic Hair"
    />
  `
})
export class SyntheticHairComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('syntheticHair.title');
    const subtitle = this.languageService.getTranslation('syntheticHair.subtitle');
    const url = '/synthetic-hair';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium synthetic hair products at ${brandName}. High-quality synthetic hair extensions and wigs for all styles.`,
      keywords: 'synthetic hair, synthetic hair extensions, synthetic wigs, artificial hair, synthetic hair products',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

