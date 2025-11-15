import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-hairpieces',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="hairpieces.title"
      subtitleKey="hairpieces.subtitle"
      searchPlaceholderKey="hairpieces.searchPlaceholder"
      noResultsKey="hairpieces.noResults"
      categoryName="Hairpieces"
    />
  `
})
export class HairpiecesComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('hairpieces.title');
    const subtitle = this.languageService.getTranslation('hairpieces.subtitle');
    const url = '/hairpieces';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium hairpieces at ${brandName}. High-quality hairpieces for all your styling needs.`,
      keywords: 'hairpieces, hair pieces, hair toppers, partial wigs, hair replacement',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

