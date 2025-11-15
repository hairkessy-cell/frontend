import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language, Translations, translations } from '../data/translations';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject: BehaviorSubject<Language>;
  public currentLanguage$: Observable<Language>;
  private readonly STORAGE_KEY = 'preferred-language';

  constructor() {
    const savedLanguage = this.getSavedLanguage();
    this.currentLanguageSubject = new BehaviorSubject<Language>(savedLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguageSubject.next(language);
    localStorage.setItem(this.STORAGE_KEY, language);
  }

  getTranslation(key: string): string {
    const language = this.getCurrentLanguage();
    const translationObj = translations[language];
    
    const keys = key.split('.');
    let value: any = translationObj;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }

  getTranslations(): Translations {
    const language = this.getCurrentLanguage();
    return translations[language];
  }

  private getSavedLanguage(): Language {
    if (typeof window === 'undefined' || !window.localStorage) {
      return 'english';
    }

    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved && (saved === 'turkish' || saved === 'english' || saved === 'russian')) {
      return saved as Language;
    }
    
    return 'english';
  }
}

