import { Component, OnInit } from '@angular/core';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-wig-materials',
  standalone: true,
  imports: [ProductListingComponent],
  template: `
    <app-product-listing
      titleKey="wigMaterials.title"
      subtitleKey="wigMaterials.subtitle"
      searchPlaceholderKey="wigMaterials.searchPlaceholder"
      noResultsKey="wigMaterials.noResults"
      categoryName="Wig Materials"
    />
  `
})
export class WigMaterialsComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('wigMaterials.title');
    const subtitle = this.languageService.getTranslation('wigMaterials.subtitle');
    const url = '/wig-materials';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Shop premium wig materials at ${brandName}. Professional quality materials for wig making.`,
      keywords: 'wig materials, wig making supplies, wig cap materials, professional wig materials',
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }
}

