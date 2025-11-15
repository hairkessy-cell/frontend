import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-wigs',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="wigs.title"
      subtitleKey="wigs.subtitle"
      searchPlaceholderKey="wigs.searchPlaceholder"
      noResultsKey="wigs.noResults"
      categoryName="Wigs"
    />
  `
})
export class WigsComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('wigs.title');
    const subtitle = this.languageService.getTranslation('wigs.subtitle');
    const url = '/wigs';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium quality wigs at ${brandName}. Discover our wide selection of professional wigs for all styles and occasions.`,
      keywords: 'wigs, hair wigs, professional wigs, synthetic wigs, human hair wigs, wig products',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

