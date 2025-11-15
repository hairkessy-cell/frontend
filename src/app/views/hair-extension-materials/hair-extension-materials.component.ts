import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-hair-extension-materials',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="hairExtensionMaterials.title"
      subtitleKey="hairExtensionMaterials.subtitle"
      searchPlaceholderKey="hairExtensionMaterials.searchPlaceholder"
      noResultsKey="hairExtensionMaterials.noResults"
      categoryName="Hair Extension Materials"
    />
  `
})
export class HairExtensionMaterialsComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('hairExtensionMaterials.title');
    const subtitle = this.languageService.getTranslation('hairExtensionMaterials.subtitle');
    const url = '/hair-extension-materials';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium hair extension materials at ${brandName}. Professional quality materials for hair extensions.`,
      keywords: 'hair extension materials, extension materials, hair extension supplies, professional extension materials',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

