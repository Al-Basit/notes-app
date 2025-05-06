import axios from "@/lib/config/axios-instance";
import {
  fetchActivityLogsResponse,
  fetchVerificationLogsResponse,
} from "@/lib/types/logs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const LogsService = () => {
  const useFetchVerificationLogs = (page?: number, limit?: number,startDate?:string,endDate?:string) => {
    function fetchProduct(): Promise<fetchVerificationLogsResponse> {
      let url = "/verification-logs";

      const queryParams: string[] = [];
      if (page !== undefined) queryParams.push(`page=${page}`);
      if (limit !== undefined) queryParams.push(`limit=${limit}`);
      if (startDate !== undefined) queryParams.push(`startDate=${startDate}`);
      if (endDate !== undefined) queryParams.push(`endDate=${endDate}`);
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchProduct,
      queryKey: ["verification-logs", page, limit,startDate,endDate],
    });
  };
 
  const useFetchUserVerificationLogs = (
    userId = ""
  ) => {
    function fetchProducts({ pageParam = 1 }): Promise<fetchVerificationLogsResponse> {
      return axios
        .get(
          `/verification-logs?page=${pageParam}&limit=10&userId=${userId}`
        )
        .then((res) => res.data);
    }

    return useInfiniteQuery({
      queryFn: fetchProducts,
      queryKey: ["verification-logs", userId],
      getNextPageParam: (page) =>
        page.page === page.lastPage ? undefined : page.page + 1,
      //@ts-ignore
      select: (data) =>
        data.pages.flatMap((page) => page.data || []),
    });
  };

  const useFetchActivityLogs = (
    page?: number,
    limit?: number,
    startDate?: string | undefined,
    endDate?: string | undefined
  ) => {
    function fetchProduct(): Promise<fetchActivityLogsResponse> {
      let url = "/logs";
      const queryParams: string[] = [];
      if (page !== undefined) queryParams.push(`page=${page}`);
      if (limit !== undefined) queryParams.push(`limit=${limit}`);
      if (startDate !== undefined) queryParams.push(`startDate=${startDate}`);
      if (endDate !== undefined) queryParams.push(`endDate=${endDate}`);
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchProduct,
      queryKey: ["logs", page, limit, startDate, endDate],
    });
  };
  const useFetchInventoryTransferLogs = (
    page?:number,
    sort?: string,
    limit?: number,
    startDate?: string | undefined,
    endDate?: string | undefined
  ) => {
    function fetchInventoryTransfer(): Promise<fetchActivityLogsResponse> {
      let url = "/admin/inventory-movements";
      const queryParams: string[] = [];
      if (page !== undefined) queryParams.push(`page=${page}`);
      if (sort !== undefined) queryParams.push(`sort=DESC`);
      if (limit !== undefined) queryParams.push(`limit=${limit}`);
      if (startDate !== undefined) queryParams.push(`startDate=${startDate}`);
      if (endDate !== undefined) queryParams.push(`endDate=${endDate}`);
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchInventoryTransfer,
      queryKey: ["inventories", page, sort, limit, startDate, endDate],
    });
  };

  return {
    useFetchVerificationLogs,
    useFetchActivityLogs,
    useFetchUserVerificationLogs,
    useFetchInventoryTransferLogs
  };
};

export default LogsService;
