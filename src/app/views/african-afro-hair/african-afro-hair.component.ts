import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-african-afro-hair',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="africanAfroHair.title"
      subtitleKey="africanAfroHair.subtitle"
      searchPlaceholderKey="africanAfroHair.searchPlaceholder"
      noResultsKey="africanAfroHair.noResults"
      categoryName="African Afro Hair"
    />
  `,
})
export class AfricanAfroHairComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('africanAfroHair.title');
    const subtitle = this.languageService.getTranslation('africanAfroHair.subtitle');
    const url = '/african-afro-hair';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium African afro hair products at ${brandName}. High-quality afro hair extensions for all styles.`,
      keywords: 'african afro hair, afro hair extensions, curly hair, afro hair products, natural afro hair',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}
