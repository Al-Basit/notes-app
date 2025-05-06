import { userType } from "./user";

export type fileStorageType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  referenceId: number;
  module: string;
  type: string;
  file: string;
};

export type fetchFileStorageApiResponse = PaginatedResponse<fileStorageType[]>;
