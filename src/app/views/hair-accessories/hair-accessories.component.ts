import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-hair-accessories',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="hairAccessories.title"
      subtitleKey="hairAccessories.subtitle"
      searchPlaceholderKey="hairAccessories.searchPlaceholder"
      noResultsKey="hairAccessories.noResults"
      categoryName="Hair Accessories"
    />
  `
})
export class HairAccessoriesComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('hairAccessories.title');
    const subtitle = this.languageService.getTranslation('hairAccessories.subtitle');
    const url = '/hair-accessories';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium hair accessories at ${brandName}. Find the perfect accessories for your hair styling needs.`,
      keywords: 'hair accessories, hair styling accessories, hair clips, hair bands, hair styling tools',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

