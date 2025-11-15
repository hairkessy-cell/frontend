import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    const brandName = this.languageService.getTranslation('common.brandName');
    const title = this.languageService.getTranslation('about.title');
    const subtitle = this.languageService.getTranslation('about.subtitle');
    const url = '/about-us';

    this.seoService.setHreflangTags([
      { lang: 'en', url },
      { lang: 'tr', url: `${url}?lang=turkish` },
      { lang: 'ru', url: `${url}?lang=russian` }
    ]);

    this.seoService.setSEOData({
      title: `${title} - ${brandName}`,
      description: subtitle || `Learn more about ${brandName}. We provide premium quality hair products, wigs, and extensions for professionals and individuals.`,
      keywords: `${brandName}, about us, hair products company, professional hair products, hair extensions company`,
      url,
      type: 'website',
      image: '/assets/images/logo.svg'
    });
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }
}

