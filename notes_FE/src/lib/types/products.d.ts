import { ApiResponse, PaginatedResponse } from ".";

export type productType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  uuid: string;
  sku: number;
  productName: string;
  volume: number;
  productDescription: string;
  productImage: string;
  productCode: string;
  isActive: boolean;
  price: number;
  codes:{
    ean13: string;
  }
  countryCode: string;
  manufacturerCode: string;
  qrcode: string;
  categoryId: number;
};

export type fetchAllProductsApiResponse = PaginatedResponse<productType[]>;
export type fetchSingleProductApiResponse = ApiResponse<productType>;
