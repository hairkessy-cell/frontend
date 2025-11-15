import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  protected featuredProducts: ProductResponse[] = [];
  protected customerAvatars: string[] = [];

  constructor(
    private languageService: LanguageService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts(0, 8).subscribe(response => {
      this.featuredProducts = response.content;
    });

    // Use placeholder images of real people for customer avatars
    this.customerAvatars = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    ];
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }
}

