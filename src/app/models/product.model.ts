export interface DeliveryOption {
  deliveryDuration: number;
  fastDeliveryType?: 'SAME_DAY_SHIPPING' | 'FAST_DELIVERY' | null;
}

export interface ProductImage {
  url: string;
}

export interface ProductAttribute {
  attributeId: number;
  attributeName: string;
  attributeValueId?: number | null;
  attributeValue?: string | null;
}

export interface ProductResponse {
  id: string;
  approved: boolean;
  archived: boolean;
  productCode: number;
  batchRequestId?: string | null;
  supplierId: number;
  createDateTime: number;
  lastUpdateDate: number;
  gender?: string | null;
  brand?: string | null;
  barcode?: string | null;
  title: string;
  categoryName?: string | null;
  productMainId?: string | null;
  description?: string | null;
  stockUnitType?: string | null;
  quantity: number;
  listPrice: number;
  salePrice: number;
  vatRate: number;
  dimensionalWeight?: number | null;
  stockCode?: string | null;
  locationBasedDelivery?: 'ENABLED' | 'DISABLED' | null;
  lotNumber?: string | null;
  deliveryOption?: DeliveryOption | null;
  images: ProductImage[];
  attributes: ProductAttribute[];
  platformListingId?: string | null;
  stockId?: string | null;
  hasActiveCampaign: boolean;
  locked: boolean;
  productContentId?: number | null;
  pimCategoryId?: number | null;
  brandId?: number | null;
  version?: number | null;
  color?: string | null;
  size?: string | null;
  lockedByUnSuppliedReason: boolean;
  onsale: boolean;
  productUrl?: string | null;
}

export interface ProductListResponse {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  content: ProductResponse[];
}

export interface ProductFilterParams {
  approved?: boolean | null;
  barcode?: string | null;
  startDate?: number | null;
  endDate?: number | null;
  page?: number;
  dateQueryType?: 'CREATED_DATE' | 'LAST_MODIFIED_DATE' | null;
  size?: number;
  supplierId?: number | null;
  stockCode?: string | null;
  archived?: boolean | null;
  productMainId?: string | null;
  onSale?: boolean | null;
  rejected?: boolean | null;
  blacklisted?: boolean | null;
  brandIds?: number[] | null;
}

