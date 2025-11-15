import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-real-human-hair',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="realHumanHair.title"
      subtitleKey="realHumanHair.subtitle"
      searchPlaceholderKey="realHumanHair.searchPlaceholder"
      noResultsKey="realHumanHair.noResults"
      categoryName="Real Human Hair"
    />
  `
})
export class RealHumanHairComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('realHumanHair.title');
    const subtitle = this.languageService.getTranslation('realHumanHair.subtitle');
    const url = '/real-human-hair';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium real human hair at ${brandName}. High-quality 100% human hair extensions and products.`,
      keywords: 'real human hair, human hair extensions, 100% human hair, virgin hair, remy hair',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

