import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-real-training-hair',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="realTrainingHair.title"
      subtitleKey="realTrainingHair.subtitle"
      searchPlaceholderKey="realTrainingHair.searchPlaceholder"
      noResultsKey="realTrainingHair.noResults"
      categoryName="Real Training Mannequin Hair"
    />
  `
})
export class RealTrainingHairComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('realTrainingHair.title');
    const subtitle = this.languageService.getTranslation('realTrainingHair.subtitle');
    const url = '/real-training-hair';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium real training hair at ${brandName}. Professional quality real hair for training mannequins.`,
      keywords: 'real training hair, human hair training, training mannequin hair, real practice hair',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

