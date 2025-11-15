import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-bead-extensions',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="beadExtensions.title"
      subtitleKey="beadExtensions.subtitle"
      searchPlaceholderKey="beadExtensions.searchPlaceholder"
      noResultsKey="beadExtensions.noResults"
      categoryName="Bead Extensions"
    />
  `,
})
export class BeadExtensionsComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('beadExtensions.title');
    const subtitle = this.languageService.getTranslation('beadExtensions.subtitle');
    const url = '/bead-extensions';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium bead extensions at ${brandName}. High-quality bead hair extensions for all styles.`,
      keywords: 'bead extensions, bead hair extensions, micro bead extensions, professional bead extensions',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}
