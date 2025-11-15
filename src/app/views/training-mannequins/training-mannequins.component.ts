import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-training-mannequins',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="trainingMannequins.title"
      subtitleKey="trainingMannequins.subtitle"
      searchPlaceholderKey="trainingMannequins.searchPlaceholder"
      noResultsKey="trainingMannequins.noResults"
      categoryName="Training Mannequins"
    />
  `
})
export class TrainingMannequinsComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('trainingMannequins.title');
    const subtitle = this.languageService.getTranslation('trainingMannequins.subtitle');
    const url = '/training-mannequins';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop professional training mannequins at ${brandName}. High-quality mannequins for hair styling practice.`,
      keywords: 'training mannequins, hair mannequins, practice mannequins, styling mannequins, professional mannequins',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

