import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { LanguageService } from './language.service';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  structuredData?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document: Document = inject(DOCUMENT);
  private languageService = inject(LanguageService);
  
  private readonly baseUrl = 'https://hairkessy.com';
  private readonly defaultSiteName = 'HAIRKESSY';
  private structuredDataScriptId = 'structured-data-script';

  /**
   * Set comprehensive SEO data for a page
   */
  setSEOData(data: SEOData): void {
    const lang = this.languageService.getCurrentLanguage();
    const locale = this.getLocaleCode(lang);
    
    // Set title
    if (data.title) {
      this.setTitle(data.title);
    }

    // Set meta description
    if (data.description) {
      this.setDescription(data.description);
    }

    // Set keywords
    if (data.keywords) {
      this.setKeywords(data.keywords);
    }

    // Set canonical URL
    const canonicalUrl = data.url || this.getCurrentUrl();
    this.setCanonicalUrl(canonicalUrl);

    // Set Open Graph tags
    this.setOpenGraphTags({
      title: data.title,
      description: data.description,
      image: data.image,
      url: canonicalUrl,
      type: data.type || 'website',
      siteName: data.siteName || this.defaultSiteName,
      locale: data.locale || locale
    });

    // Set Twitter Card tags
    this.setTwitterCardTags({
      title: data.title,
      description: data.description,
      image: data.image
    });

    // Set structured data
    if (data.structuredData) {
      this.setStructuredData(data.structuredData);
    }
  }

  /**
   * Set page title
   */
  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  /**
   * Set meta description
   */
  setDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  /**
   * Set meta keywords
   */
  setKeywords(keywords: string): void {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  /**
   * Set canonical URL
   */
  setCanonicalUrl(url: string): void {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    
    // Remove existing canonical link
    const existingLink = this.document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new canonical link
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', fullUrl);
    this.document.head.appendChild(link);
  }

  /**
   * Set Open Graph meta tags
   */
  setOpenGraphTags(data: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
    locale?: string;
  }): void {
    if (data.title) {
      this.meta.updateTag({ property: 'og:title', content: data.title });
    }
    if (data.description) {
      this.meta.updateTag({ property: 'og:description', content: data.description });
    }
    if (data.image) {
      const imageUrl = data.image.startsWith('http') ? data.image : `${this.baseUrl}${data.image}`;
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
    }
    if (data.url) {
      const fullUrl = data.url.startsWith('http') ? data.url : `${this.baseUrl}${data.url}`;
      this.meta.updateTag({ property: 'og:url', content: fullUrl });
    }
    if (data.type) {
      this.meta.updateTag({ property: 'og:type', content: data.type });
    }
    if (data.siteName) {
      this.meta.updateTag({ property: 'og:site_name', content: data.siteName });
    }
    if (data.locale) {
      this.meta.updateTag({ property: 'og:locale', content: data.locale });
    }
  }

  /**
   * Set Twitter Card meta tags
   */
  setTwitterCardTags(data: {
    title?: string;
    description?: string;
    image?: string;
  }): void {
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    
    if (data.title) {
      this.meta.updateTag({ name: 'twitter:title', content: data.title });
    }
    if (data.description) {
      this.meta.updateTag({ name: 'twitter:description', content: data.description });
    }
    if (data.image) {
      const imageUrl = data.image.startsWith('http') ? data.image : `${this.baseUrl}${data.image}`;
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    }
  }

  /**
   * Set hreflang tags for multi-language support
   */
  setHreflangTags(urls: { lang: string; url: string }[]): void {
    // Remove existing hreflang links
    const existingLinks = this.document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingLinks.forEach((link: Element) => link.remove());

    // Add hreflang links
    urls.forEach(({ lang, url }) => {
      const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
      const link: HTMLLinkElement = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', fullUrl);
      this.document.head.appendChild(link);
    });

    // Add x-default
    if (urls.length > 0) {
      const defaultUrl = urls.find(u => u.lang === 'en') || urls[0];
      const fullUrl = defaultUrl.url.startsWith('http') ? defaultUrl.url : `${this.baseUrl}${defaultUrl.url}`;
      const link: HTMLLinkElement = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', 'x-default');
      link.setAttribute('href', fullUrl);
      this.document.head.appendChild(link);
    }
  }

  /**
   * Set structured data (JSON-LD)
   */
  setStructuredData(data: any): void {
    // Remove existing structured data script
    const existingScript = this.document.getElementById(this.structuredDataScriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script element
    const script = this.document.createElement('script');
    script.id = this.structuredDataScriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  /**
   * Add structured data (for multiple schemas on same page)
   */
  addStructuredData(data: any, id?: string): void {
    const scriptId = id || `structured-data-${Date.now()}`;
    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  /**
   * Get current URL path
   */
  private getCurrentUrl(): string {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  }

  /**
   * Get locale code from language
   */
  private getLocaleCode(lang: string): string {
    const localeMap: { [key: string]: string } = {
      'english': 'en_US',
      'turkish': 'tr_TR',
      'russian': 'ru_RU'
    };
    return localeMap[lang] || 'en_US';
  }
}

