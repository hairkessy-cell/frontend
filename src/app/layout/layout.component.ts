import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  RouterLink,
  RouterLinkActive,
  Router,
  NavigationEnd,
} from '@angular/router';
import { LanguageService } from '../services/language.service';
import { SEOService } from '../services/seo.service';
import { Language } from '../data/translations';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  protected currentLanguage = signal<Language>('english');
  protected showLanguageDropdown = signal<boolean>(false);
  protected showLeftChevron = signal<boolean>(false);
  protected showRightChevron = signal<boolean>(true);
  private routerSubscription?: Subscription;
  private resizeListener?: () => void;

  @ViewChild('categoryNavContainer', { static: false })
  categoryNavContainer?: ElementRef<HTMLDivElement>;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.languageService.getCurrentLanguage());

    this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage.set(lang);
    });

    // Set Organization structured data
    this.setOrganizationSchema();

    // Scroll to top on route navigation
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  private setOrganizationSchema(): void {
    const brandName = this.languageService.getTranslation('common.brandName');

    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: brandName,
      url: 'https://hairkessy.com',
      logo: 'https://hairkessy.com/assets/images/logo.svg',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+90-212-123-4567',
        contactType: 'customer service',
        email: 'info@atlasperuk.com',
        areaServed: ['TR', 'US', 'EU'],
        availableLanguage: ['English', 'Turkish', 'Russian'],
      },
      sameAs: [
        'https://www.facebook.com/hairkessy',
        'https://www.instagram.com/hairkessy',
        'https://www.twitter.com/hairkessy',
      ],
    };

    this.seoService.addStructuredData(
      organizationSchema,
      'organization-schema'
    );
  }

  ngAfterViewInit(): void {
    // Check initial scroll state
    setTimeout(() => {
      this.checkScrollButtons();
    }, 100);

    // Check scroll buttons on window resize
    this.resizeListener = () => {
      this.checkScrollButtons();
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.showLanguageDropdown.set(false);
    }
  }

  setLanguage(language: Language): void {
    this.languageService.setLanguage(language);
    this.showLanguageDropdown.set(false);
  }

  toggleLanguageDropdown(): void {
    this.showLanguageDropdown.update((value) => !value);
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }

  scrollCategoryNav(direction: 'left' | 'right'): void {
    if (!this.categoryNavContainer?.nativeElement) return;

    const container = this.categoryNavContainer.nativeElement;
    const scrollAmount = 200; // pixels to scroll per click
    const currentScroll = container.scrollLeft;
    const newScroll =
      direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    container.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });

    // Update button visibility after scroll
    setTimeout(() => {
      this.checkScrollButtons();
    }, 300);
  }

  checkScrollButtons(): void {
    if (!this.categoryNavContainer?.nativeElement) return;

    const container = this.categoryNavContainer.nativeElement;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Show left chevron if not at the start
    this.showLeftChevron.set(scrollLeft > 0);

    // Show right chevron if not at the end
    this.showRightChevron.set(scrollLeft < scrollWidth - clientWidth - 1);
  }

  onCategoryNavScroll(): void {
    this.checkScrollButtons();
  }
}
