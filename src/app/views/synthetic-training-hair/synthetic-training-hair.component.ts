import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-synthetic-training-hair',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="syntheticTrainingHair.title"
      subtitleKey="syntheticTrainingHair.subtitle"
      searchPlaceholderKey="syntheticTrainingHair.searchPlaceholder"
      noResultsKey="syntheticTrainingHair.noResults"
      categoryName="Synthetic Training Mannequin Hair"
    />
  `
})
export class SyntheticTrainingHairComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('syntheticTrainingHair.title');
    const subtitle = this.languageService.getTranslation('syntheticTrainingHair.subtitle');
    const url = '/synthetic-training-hair';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium synthetic training hair at ${brandName}. Professional quality training mannequin hair.`,
      keywords: 'synthetic training hair, training mannequin hair, practice hair, synthetic practice hair',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

