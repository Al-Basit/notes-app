import { PaginatedResponse } from ".";

export enum USER_ROLES {
  ADMIN = "Admin",
  SUPERADMIN = "Super Admin",
  USER = "User",
  GUEST = "Guest",
  CUSTOMER = "Customer",
  SALES_REP = "Sales Representative",
}

export enum USER_ROLES_ID {
  ADMIN = 1,
  CUSTOMER = 2,
  SUPERADMIN = 24,
  SALES_REP = 31,
}

export type userType = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string | null;
  email: string;
  roleId: number;
  isActive: boolean;
  isVerified: boolean;
  profileId: number;
  address?: string;
  operatingRegion: {
    id: number;
    name: string;
  };
  operatingUnit: {
    id: number;
    name: string;
    regionId: number;
  };
  role: USER_ROLES;
};

export type distributorResponseType = {
  distributor: {
    id: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    name: string;
    address: string;
    contactNumber: string;
    email: string;
    ntn: string;
    vehicleDetails: string;
    annualTurnover: number;
  };
  vehiclesInformation: {
    id: number;
    vehicleType: string;
    numberOfVehicles: number;
  }[];
  businessTurnovers: {
    id: number;
    productName: string;
    productAnnualTurnover: number;
  }[];
  bankDetails: {
    id: number;
    bankName: string;
    accountNumber: string;
    accountHolderName: string;
    ibanOrSwiftCode: string;
  }[];
  staffDetails: {
    id: number;
    numberOfEmployees: number;
    additionalComments: string;
  }[];
};

export type distributorType = {
  id?: number;
  name?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  ntn?: string;
};

export type userProfileType = {
  id: number;
  userName: string | null;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  isActive: boolean;
  roleId: number;
  profileId: number;
  role: {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
  };
  profile: {
    id: number;
    createdAt: string;
    updatedAt: string;
    dob: string | null;
    gender: string | null;
    bio: string | null;
    image: string | null;
    phoneNo: string | null;
  };
  verificationLogs: Array<any>;
  logs: Array<{
    id: number;
    createdAt: string;
    updatedAt: string;
    message: string;
    userId: number;
  }>;
  journeyPlans: Array<{
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    isDeleted: boolean;
    userId: number;
  }>;
};
export type loginResponseData = {
  user: userType;
  profile: userProfileType;
  access_token: string;
};

export type loginApiResponse = {
  message: string;
  data: loginResponseData;
};

export type fetchAllUserApiResponse = PaginatedResponse<userType[]>;
export type fetchAllDistributorApiResponse = PaginatedResponse<userType[]>;

export type storeType = {
  id: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  name: string;
  websiteUrl: string;
  phone: string;
  colorCode: string;
  isActive: boolean;
  inventoryId: number;
  address: {
    streetAddress: string;
    city: string;
    area: string;
    postalCode: string;
    country: string;
    longitude: string;
    latitude: string;
  };
};

type customerAddressType = {
  streetAddress: string | null;
  city: string | null;
  area: string | null;
  postalCode: string | null;
  country: string | null;
  longitude: string | null;
  latitude: string | null;
};

type createdByUserType = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  isActive: boolean;
  roleId: number;
  profileId: number;
};

export type customerType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone: string;
  company: string;
  position: string;
  preferredContactMethod: string;
  tier: string;
  status: string;
  colorCode: string;
  isActive: boolean;
  leadId: number | null;
  isFiler?: boolean;
  createdByUserId: number;
  address: customerAddressType;
  billingAddress: customerAddressType;
  createdByUser: createdByUserType;
  stores: storeType[];
};

export type fetchAllCustomerAPIResponse = PaginatedResponse<customerType[]>;
