import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ProductResponse, ProductListResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dummyProducts: ProductResponse[] = [
    {
      id: '1f8eef1aeef3cbfaad2f0ec207945d9f',
      approved: true,
      archived: false,
      productCode: 75984627,
      batchRequestId: null,
      supplierId: 123456,
      createDateTime: 1593680142092,
      lastUpdateDate: 1594382124384,
      gender: 'Female',
      brand: 'Atlas Premium',
      barcode: '8690123456789',
      title: 'Long Wavy Blonde Wig - Natural Look',
      categoryName: 'Wigs',
      productMainId: 'PM001',
      description:
        'Premium quality synthetic wig with natural wavy texture. Perfect for everyday wear or special occasions. Heat resistant up to 180°C.',
      stockUnitType: 'PIECE',
      quantity: 15,
      listPrice: 299.99,
      salePrice: 249.99,
      vatRate: 20,
      dimensionalWeight: 0.5,
      stockCode: 'STK-BLONDE-001',
      locationBasedDelivery: 'ENABLED',
      lotNumber: 'LOT2024001',
      deliveryOption: {
        deliveryDuration: 3,
        fastDeliveryType: 'FAST_DELIVERY',
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500',
        },
        {
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500',
        },
      ],
      attributes: [
        {
          attributeId: 1,
          attributeName: 'Color',
          attributeValueId: 1,
          attributeValue: 'Blonde',
        },
        {
          attributeId: 2,
          attributeName: 'Length',
          attributeValueId: 2,
          attributeValue: 'Long (24 inches)',
        },
        {
          attributeId: 3,
          attributeName: 'Material',
          attributeValueId: 3,
          attributeValue: 'Synthetic Fiber',
        },
        {
          attributeId: 4,
          attributeName: 'Style',
          attributeValueId: 4,
          attributeValue: 'Wavy',
        },
      ],
      platformListingId: 'PLT001',
      stockId: 'STK001',
      hasActiveCampaign: true,
      locked: false,
      productContentId: 1001,
      pimCategoryId: 501,
      brandId: 201,
      version: 1,
      color: 'Blonde',
      size: 'One Size',
      lockedByUnSuppliedReason: false,
      onsale: true,
      productUrl: '/product/1f8eef1aeef3cbfaad2f0ec207945d9f',
    },
    {
      id: '2a9fef2beff4dcgbbae3f1fd318056e0g',
      approved: true,
      archived: false,
      productCode: 75984628,
      supplierId: 123456,
      createDateTime: 1593680142093,
      lastUpdateDate: 1594382124385,
      gender: 'Female',
      brand: 'Atlas Premium',
      title: 'Curly Red Hair Wig - Vibrant',
      categoryName: 'Wigs',
      description:
        'Beautiful curly red wig with natural movement. Made from high-quality synthetic fibers that mimic real hair.',
      quantity: 8,
      listPrice: 349.99,
      salePrice: 299.99,
      vatRate: 20,
      stockCode: 'STK-RED-001',
      deliveryOption: {
        deliveryDuration: 5,
        fastDeliveryType: null,
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500',
        },
      ],
      attributes: [
        {
          attributeId: 1,
          attributeName: 'Color',
          attributeValueId: 5,
          attributeValue: 'Red',
        },
        {
          attributeId: 2,
          attributeName: 'Length',
          attributeValueId: 2,
          attributeValue: 'Long (22 inches)',
        },
        {
          attributeId: 3,
          attributeName: 'Material',
          attributeValueId: 3,
          attributeValue: 'Synthetic Fiber',
        },
        {
          attributeId: 4,
          attributeName: 'Style',
          attributeValueId: 5,
          attributeValue: 'Curly',
        },
      ],
      hasActiveCampaign: false,
      locked: false,
      color: 'Red',
      size: 'One Size',
      lockedByUnSuppliedReason: false,
      onsale: true,
      productUrl: '/product/2a9fef2beff4dcgbbae3f1fd318056e0g',
    },
    {
      id: '3b0gfg3cffg5edhccbf4g2ge429167f1h',
      approved: true,
      archived: false,
      productCode: 75984629,
      supplierId: 123456,
      createDateTime: 1593680142094,
      lastUpdateDate: 1594382124386,
      gender: 'Female',
      brand: 'Atlas Premium',
      title: 'Straight Black Wig - Classic Elegance',
      categoryName: 'Wigs',
      description:
        'Classic straight black wig for a timeless look. Perfect for professional settings or formal events.',
      quantity: 20,
      listPrice: 279.99,
      salePrice: 229.99,
      vatRate: 20,
      stockCode: 'STK-BLACK-001',
      deliveryOption: {
        deliveryDuration: 2,
        fastDeliveryType: 'SAME_DAY_SHIPPING',
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
        },
      ],
      attributes: [
        {
          attributeId: 1,
          attributeName: 'Color',
          attributeValueId: 6,
          attributeValue: 'Black',
        },
        {
          attributeId: 2,
          attributeName: 'Length',
          attributeValueId: 3,
          attributeValue: 'Medium (18 inches)',
        },
        {
          attributeId: 3,
          attributeName: 'Material',
          attributeValueId: 3,
          attributeValue: 'Synthetic Fiber',
        },
        {
          attributeId: 4,
          attributeName: 'Style',
          attributeValueId: 6,
          attributeValue: 'Straight',
        },
      ],
      hasActiveCampaign: true,
      locked: false,
      color: 'Black',
      size: 'One Size',
      lockedByUnSuppliedReason: false,
      onsale: true,
      productUrl: '/product/3b0gfg3cffg5edhccbf4g2ge429167f1h',
    },
    {
      id: '4c1hgh4dggg6feiddcg5h3hf530278g2i',
      approved: true,
      archived: false,
      productCode: 75984630,
      supplierId: 123456,
      createDateTime: 1593680142095,
      lastUpdateDate: 1594382124387,
      gender: 'Female',
      brand: 'Atlas Premium',
      title: 'Platinum Blonde Straight Wig',
      categoryName: 'Wigs',
      description:
        'Stunning platinum blonde straight wig. Ultra-lightweight and comfortable for all-day wear.',
      quantity: 12,
      listPrice: 379.99,
      salePrice: 329.99,
      vatRate: 20,
      stockCode: 'STK-PLATINUM-001',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500',
        },
      ],
      attributes: [
        {
          attributeId: 1,
          attributeName: 'Color',
          attributeValueId: 7,
          attributeValue: 'Platinum Blonde',
        },
        {
          attributeId: 2,
          attributeName: 'Length',
          attributeValueId: 2,
          attributeValue: 'Long (26 inches)',
        },
        {
          attributeId: 3,
          attributeName: 'Material',
          attributeValueId: 3,
          attributeValue: 'Synthetic Fiber',
        },
        {
          attributeId: 4,
          attributeName: 'Style',
          attributeValueId: 6,
          attributeValue: 'Straight',
        },
      ],
      hasActiveCampaign: false,
      locked: false,
      color: 'Platinum Blonde',
      size: 'One Size',
      lockedByUnSuppliedReason: false,
      onsale: true,
      productUrl: '/product/4c1hgh4dggg6feiddcg5h3hf530278g2i',
    },
    {
      id: '5d2ihi5ehhh7gfjeedh6i4ig641389h3j',
      approved: true,
      archived: false,
      productCode: 75984631,
      supplierId: 123456,
      createDateTime: 1593680142096,
      lastUpdateDate: 1594382124388,
      gender: 'Female',
      brand: 'Atlas Premium',
      title: 'Brunette Wavy Wig - Natural Brown',
      categoryName: 'Wigs',
      description:
        'Natural brunette wavy wig with subtle highlights. Perfect for a sophisticated everyday look.',
      quantity: 18,
      listPrice: 289.99,
      salePrice: 239.99,
      vatRate: 20,
      stockCode: 'STK-BRUNETTE-001',
      deliveryOption: {
        deliveryDuration: 4,
        fastDeliveryType: 'FAST_DELIVERY',
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500',
        },
      ],
      attributes: [
        {
          attributeId: 1,
          attributeName: 'Color',
          attributeValueId: 8,
          attributeValue: 'Brunette',
        },
        {
          attributeId: 2,
          attributeName: 'Length',
          attributeValueId: 2,
          attributeValue: 'Long (24 inches)',
        },
        {
          attributeId: 3,
          attributeName: 'Material',
          attributeValueId: 3,
          attributeValue: 'Synthetic Fiber',
        },
        {
          attributeId: 4,
          attributeName: 'Style',
          attributeValueId: 4,
          attributeValue: 'Wavy',
        },
      ],
      hasActiveCampaign: true,
      locked: false,
      color: 'Brunette',
      size: 'One Size',
      lockedByUnSuppliedReason: false,
      onsale: true,
      productUrl: '/product/5d2ihi5ehhh7gfjeedh6i4ig641389h3j',
    },
    {
      id: '6e3jij6fiii8hgkffeej7j5jh752490i4k',
      approved: true,
      archived: false,
      productCode: 75984632,
      supplierId: 123456,
      createDateTime: 1593680142097,
      lastUpdateDate: 1594382124389,
      gender: 'Female',
      brand: 'Atlas Premium',
      title: 'Auburn Curly Wig - Warm Tones',
      categoryName: 'Wigs',
      description:
        'Warm auburn curly wig with rich red-brown tones. Adds warmth and dimension to your look.',
      quantity: 10,
      listPrice: 329.99,
      salePrice: 279.99,
      vatRate: 20,
      stockCode: 'STK-AUBURN-001',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
        },
      ],
      attributes: [
        {
          attributeId: 1,
          attributeName: 'Color',
          attributeValueId: 9,
          attributeValue: 'Auburn',
        },
        {
          attributeId: 2,
          attributeName: 'Length',
          attributeValueId: 2,
          attributeValue: 'Long (22 inches)',
        },
        {
          attributeId: 3,
          attributeName: 'Material',
          attributeValueId: 3,
          attributeValue: 'Synthetic Fiber',
        },
        {
          attributeId: 4,
          attributeName: 'Style',
          attributeValueId: 5,
          attributeValue: 'Curly',
        },
      ],
      hasActiveCampaign: false,
      locked: false,
      color: 'Auburn',
      size: 'One Size',
      lockedByUnSuppliedReason: false,
      onsale: true,
      productUrl: '/product/6e3jij6fiii8hgkffeej7j5jh752490i4k',
    },
    {
      id: '7f4kjk7gjjj9ihlggffk8k6ki863591j5l',
      approved: true,
      archived: false,
      productCode: 75984633,
      supplierId: 123456,
      createDateTime: 1593680142098,
      lastUpdateDate: 1594382124390,
      gender: 'Female',
      brand: 'Atlas Premium',
      title: 'Ombre Blonde to Brown Wig',
      categoryName: 'Wigs',
      description:
        'Trendy ombre wig transitioning from blonde to brown. Modern and stylish for fashion-forward individuals.',
      quantity: 7,
      listPrice: 399.99,
      salePrice: 349.99,
      vatRate: 20,
      stockCode: 'STK-OMBRE-001',
      deliveryOption: {
        deliveryDuration: 6,
        fastDeliveryType: null,
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500',
        },
      ],
      attributes: [
        {
          attributeId: 1,
          attributeName: 'Color',
          attributeValueId: 10,
          attributeValue: 'Ombre Blonde-Brown',
        },
        {
          attributeId: 2,
          attributeName: 'Length',
          attributeValueId: 2,
          attributeValue: 'Long (24 inches)',
        },
        {
          attributeId: 3,
          attributeName: 'Material',
          attributeValueId: 3,
          attributeValue: 'Synthetic Fiber',
        },
        {
          attributeId: 4,
          attributeName: 'Style',
          attributeValueId: 7,
          attributeValue: 'Ombre',
        },
      ],
      hasActiveCampaign: true,
      locked: false,
      color: 'Ombre',
      size: 'One Size',
      lockedByUnSuppliedReason: false,
      onsale: true,
      productUrl: '/product/7f4kjk7gjjj9ihlggffk8k6ki863591j5l',
    },
    {
      id: '8g5lkl8hkkk0jimhhggl9l7lj974602k6m',
      approved: true,
      archived: false,
      productCode: 75984634,
      supplierId: 123456,
      createDateTime: 1593680142099,
      lastUpdateDate: 1594382124391,
      gender: 'Female',
      brand: 'Atlas Premium',
      title: 'Short Bob Wig - Dark Brown',
      categoryName: 'Wigs',
      description:
        'Chic short bob wig in dark brown. Perfect for a professional and polished appearance.',
      quantity: 14,
      listPrice: 249.99,
      salePrice: 199.99,
      vatRate: 20,
      stockCode: 'STK-BOB-001',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500',
        },
      ],
      attributes: [
        {
          attributeId: 1,
          attributeName: 'Color',
          attributeValueId: 11,
          attributeValue: 'Dark Brown',
        },
        {
          attributeId: 2,
          attributeName: 'Length',
          attributeValueId: 4,
          attributeValue: 'Short (12 inches)',
        },
        {
          attributeId: 3,
          attributeName: 'Material',
          attributeValueId: 3,
          attributeValue: 'Synthetic Fiber',
        },
        {
          attributeId: 4,
          attributeName: 'Style',
          attributeValueId: 8,
          attributeValue: 'Bob',
        },
      ],
      hasActiveCampaign: false,
      locked: false,
      color: 'Dark Brown',
      size: 'One Size',
      lockedByUnSuppliedReason: false,
      onsale: true,
      productUrl: '/product/8g5lkl8hkkk0jimhhggl9l7lj974602k6m',
    },
    {
      id: '9h6mlm9illl1kjniiihm0m8mk085713l7n',
      approved: true,
      archived: false,
      productCode: 75984635,
      supplierId: 123456,
      createDateTime: 1593680142100,
      lastUpdateDate: 1594382124392,
      gender: 'Female',
      brand: 'Atlas Premium',
      title: 'Long Straight Wig - Honey Blonde',
      categoryName: 'Wigs',
      description:
        'Beautiful honey blonde straight wig. Natural-looking color with smooth, silky texture.',
      quantity: 16,
      listPrice: 319.99,
      salePrice: 269.99,
      vatRate: 20,
      stockCode: 'STK-HONEY-001',
      deliveryOption: {
        deliveryDuration: 3,
        fastDeliveryType: 'FAST_DELIVERY',
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500',
        },
      ],
      attributes: [
        {
          attributeId: 1,
          attributeName: 'Color',
          attributeValueId: 12,
          attributeValue: 'Honey Blonde',
        },
        {
          attributeId: 2,
          attributeName: 'Length',
          attributeValueId: 2,
          attributeValue: 'Long (26 inches)',
        },
        {
          attributeId: 3,
          attributeName: 'Material',
          attributeValueId: 3,
          attributeValue: 'Synthetic Fiber',
        },
        {
          attributeId: 4,
          attributeName: 'Style',
          attributeValueId: 6,
          attributeValue: 'Straight',
        },
      ],
      hasActiveCampaign: true,
      locked: false,
      color: 'Honey Blonde',
      size: 'One Size',
      lockedByUnSuppliedReason: false,
      onsale: true,
      productUrl: '/product/9h6mlm9illl1kjniiihm0m8mk085713l7n',
    },
    {
      id: '0i7nmn0jmmm2mlojjjin1n9nl196824m8o',
      approved: true,
      archived: false,
      productCode: 75984636,
      supplierId: 123456,
      createDateTime: 1593680142101,
      lastUpdateDate: 1594382124393,
      gender: 'Female',
      brand: 'Atlas Premium',
      title: 'Pixie Cut Wig - Black',
      categoryName: 'Wigs',
      description:
        'Bold pixie cut wig in classic black. Low maintenance and perfect for active lifestyles.',
      quantity: 11,
      listPrice: 219.99,
      salePrice: 179.99,
      vatRate: 20,
      stockCode: 'STK-PIXIE-001',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
        },
      ],
      attributes: [
        {
          attributeId: 1,
          attributeName: 'Color',
          attributeValueId: 6,
          attributeValue: 'Black',
        },
        {
          attributeId: 2,
          attributeName: 'Length',
          attributeValueId: 5,
          attributeValue: 'Very Short (6 inches)',
        },
        {
          attributeId: 3,
          attributeName: 'Material',
          attributeValueId: 3,
          attributeValue: 'Synthetic Fiber',
        },
        {
          attributeId: 4,
          attributeName: 'Style',
          attributeValueId: 9,
          attributeValue: 'Pixie',
        },
      ],
      hasActiveCampaign: false,
      locked: false,
      color: 'Black',
      size: 'One Size',
      lockedByUnSuppliedReason: false,
      onsale: true,
      productUrl: '/product/0i7nmn0jmmm2mlojjjin1n9nl196824m8o',
    },
  ];

  getProducts(
    page: number = 0,
    size: number = 10
  ): Observable<ProductListResponse> {
    const start = page * size;
    const end = start + size;
    const paginatedProducts = this.dummyProducts.slice(start, end);

    return of({
      totalElements: this.dummyProducts.length,
      totalPages: Math.ceil(this.dummyProducts.length / size),
      page: page,
      size: size,
      content: paginatedProducts,
    }).pipe(); // Simulate API delay
  }

  getProductById(id: string): Observable<ProductResponse | null> {
    const product = this.dummyProducts.find((p) => p.id === id);
    return of(product || null).pipe();
  }

  getProductsByCategory(
    categoryName: string,
    page: number = 0,
    size: number = 10
  ): Observable<ProductListResponse> {
    const filteredProducts = this.dummyProducts.filter(
      (p) => p.categoryName?.toLowerCase() === categoryName.toLowerCase()
    );
    const start = page * size;
    const end = start + size;
    const paginatedProducts = filteredProducts.slice(start, end);

    return of({
      totalElements: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / size),
      page: page,
      size: size,
      content: paginatedProducts,
    }).pipe();
  }

  getProductsByColor(
    color: string,
    page: number = 0,
    size: number = 10
  ): Observable<ProductListResponse> {
    const filteredProducts = this.dummyProducts.filter((p) =>
      p.color?.toLowerCase().includes(color.toLowerCase())
    );
    const start = page * size;
    const end = start + size;
    const paginatedProducts = filteredProducts.slice(start, end);

    return of({
      totalElements: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / size),
      page: page,
      size: size,
      content: paginatedProducts,
    }).pipe();
  }
}
