import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { Language } from '../data/translations';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  protected currentLanguage = signal<Language>('english');
  protected showLanguageDropdown = signal<boolean>(false);
  protected showBanner = signal<boolean>(true);

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.languageService.getCurrentLanguage());

    this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage.set(lang);
    });
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

  closeBanner(): void {
    this.showBanner.set(false);
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
