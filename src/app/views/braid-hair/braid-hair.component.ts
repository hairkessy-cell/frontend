import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-braid-hair',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="braidHair.title"
      subtitleKey="braidHair.subtitle"
      searchPlaceholderKey="braidHair.searchPlaceholder"
      noResultsKey="braidHair.noResults"
      categoryName="Braid Hair"
    />
  `
})
export class BraidHairComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('braidHair.title');
    const subtitle = this.languageService.getTranslation('braidHair.subtitle');
    const url = '/braid-hair';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Discover premium braid hair products at ${brandName}. High-quality braiding hair for all your styling needs.`,
      keywords: 'braid hair, braiding hair, braid extensions, synthetic braid hair, professional braid hair',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

