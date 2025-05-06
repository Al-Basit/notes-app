
import React, { ReactElement } from "react";
import {
  UseControllerProps,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormWatch,
} from "react-hook-form";

export * from "@/_utils/types/auth";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

export type errorType = {
  response: {
    data: {
      message: string | string[];
    };
  };
};

export type paginationType = {
  total: number;
  lastPage: number;
  page: number;
};

export type PaginatedResponse<T> = {
  message: string;
  data: T;
} & paginationType;

export type ApiResponse<T> = {
  message: string;
  data: T;
}


import { type ClientUploadedFileData } from "uploadthing/types"

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}