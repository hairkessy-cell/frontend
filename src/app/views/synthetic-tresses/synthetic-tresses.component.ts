import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-synthetic-tresses',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="syntheticTresses.title"
      subtitleKey="syntheticTresses.subtitle"
      searchPlaceholderKey="syntheticTresses.searchPlaceholder"
      noResultsKey="syntheticTresses.noResults"
      categoryName="Synthetic Tresses"
    />
  `
})
export class SyntheticTressesComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('syntheticTresses.title');
    const subtitle = this.languageService.getTranslation('syntheticTresses.subtitle');
    const url = '/synthetic-tresses';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium synthetic tresses at ${brandName}. High-quality synthetic hair tresses for all styles.`,
      keywords: 'synthetic tresses, hair tresses, synthetic hair tresses, professional tresses',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

