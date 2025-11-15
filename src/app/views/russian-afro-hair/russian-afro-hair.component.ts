import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-russian-afro-hair',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="russianAfroHair.title"
      subtitleKey="russianAfroHair.subtitle"
      searchPlaceholderKey="russianAfroHair.searchPlaceholder"
      noResultsKey="russianAfroHair.noResults"
      categoryName="Russian Afro Hair"
    />
  `
})
export class RussianAfroHairComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('russianAfroHair.title');
    const subtitle = this.languageService.getTranslation('russianAfroHair.subtitle');
    const url = '/russian-afro-hair';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium Russian afro hair products at ${brandName}. High-quality Russian afro hair extensions.`,
      keywords: 'russian afro hair, russian hair extensions, afro hair, curly hair extensions, russian hair products',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

