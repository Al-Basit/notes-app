import axios from "@/lib/config/axios-instance";
import {
  distributorResponseType,
  fetchAllCustomerAPIResponse,
  fetchAllUserApiResponse,
  userProfileType,
} from "@/lib/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { customerFormSchema, distributorFormSchema } from "@/lib/schemas";
import { regionType } from "@/lib/types/location";

const UserService = () => {
  const navigate = useNavigate();
  const verifyUser = async (id: number, data: any) => {
    try {
      const response = await axios.post(`/auth/verify/${id}`, data);
      toast.success("User Verified Successfully");
      return response;
    } catch (error) {
      throw error;
    }
  };
  const useFetchAllUsers = (
    page = 1,
    limit = 10000,
    searchQuery?: string,
    isActive?: string,
    roleId?: string,
    operatingRegion?: regionType
  ) => {
    async function fetchUsers(): Promise<fetchAllUserApiResponse> {
      return axios
        .get(
          `/admin/users?page=${page}&limit=${limit}${
            searchQuery?.length ?? 0 > 0 ? `&query=${searchQuery}` : ""
          }${roleId ? `&roleId=${roleId}` : ""}${
            operatingRegion ? `&operatingRegion=${operatingRegion}` : ""
          }${isActive !== "all" ? `&isActive=${isActive}` : ""}`
        )
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["users", page, limit, searchQuery, isActive, roleId],
    });
  };

  //Sales Person
  const useFetchSalesPerson = (
    roleId?: number,
    operatingRegion?: regionType,
    page = 1,
    limit = 10000,
    searchQuery?: string,
    isActive?: string
  ) => {
    async function fetchUsers(): Promise<fetchAllUserApiResponse> {
      return axios
        .get(
          `/admin/users?page=${page}&limit=${limit}${
            searchQuery?.length ?? 0 > 0 ? `&query=${searchQuery}` : ""
          }${roleId ? `&roleId=${roleId}` : ""}${
            operatingRegion !== "all"
              ? `&operatingRegion=${operatingRegion}`
              : ""
          }`
        )
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchUsers,
      queryKey: [
        "users",
        page,
        limit,
        searchQuery,
        isActive,
        roleId,
        operatingRegion,
      ],
    });
  };
  //Distributors

  const useHandleCreateDistributor = () => {
    function handleAddDistributor(
      data: z.infer<typeof distributorFormSchema>
    ): Promise<any> {
      return axios.post(`/distributor`, data).then((res) => res.data);
    }

    const onSuccess = () => {
      navigate("/distributor/view");
      toast.success("Distributor Created Successfully");
    };
    return useMutation({
      mutationFn: handleAddDistributor,
      onError: (error) => {
        //@ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess,
      retry: 0,
    });
  };

  const useHandleUpdateDistributor = (id: string | null) => {
    function handleUpdateDistributor(
      data: z.infer<typeof distributorFormSchema>
    ): Promise<any> {
      return axios
        .put(`/distributor/update/${id}`, data)
        .then((res) => res.data);
    }

    const onSuccess = () => {
      navigate("/distributor/view");
      toast.success("Distributor Updated Successfully");
    };
    return useMutation({
      mutationFn: handleUpdateDistributor,
      onError: (error) => {
        //@ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess,
      retry: 0,
    });
  };

  const useFetchAllDistributors = (
    page = 1,
    limit = 10000,
    searchQuery: string
  ) => {
    async function fetchDistributors(): Promise<fetchAllUserApiResponse> {
      return axios
        .get(
          `/admin/distributors/general-information?page=${page}&limit=${limit}${
            searchQuery.length > 0 ? `&query=${searchQuery}` : ""
          }`
        )
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchDistributors,
      queryKey: ["distributor", page, limit, searchQuery],
    });
  };

  const useFetchDistributorById = (distributorId: number | null) => {
    async function fetchDistributor(): Promise<{
      data: distributorResponseType;
    }> {
      return axios
        .get(`/admin/distributor/${distributorId}`)
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchDistributor,
      queryKey: ["distributor", distributorId],
    });
  };

  const useFetchAllCustomers = (
    page = 1,
    limit = 10000,
    searchQuery: string,
    isActive: string
  ) => {
    async function fetchProduct(): Promise<fetchAllCustomerAPIResponse> {
      return axios
        .get(
          `/customer?page=${page}&limit=${limit}${
            searchQuery.length > 0 ? `&query=${searchQuery}` : ""
          }${isActive !== "all" ? `&isActive=${isActive}` : ""}`
        )
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchProduct,
      queryKey: ["customers", page, limit, searchQuery, isActive],
    });
  };

  const useFetchSingleUser = (userId: string) => {
    async function fetchProduct(): Promise<{ data: userProfileType }> {
      return axios.get(`/admin/user/${userId}`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchProduct,
      queryKey: ["user", userId],
    });
  };

  const useFetchSingleCustomer = (id: string | null) => {
    async function fetchProduct(): Promise<{
      data: z.infer<typeof customerFormSchema>;
    }> {
      return axios.get(`/customer/${id}`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchProduct,
      queryKey: ["customer", id],
      enabled: !!id,
    });
  };

  const useHandleCreateUser = () => {
    function handleLogInRequest(data: {
      firstName: string;
      lastName: string;
      roleId: string;
      email: string;
      password: string;
    }): Promise<any> {
      return axios.post(`/admin/create-user/`, data).then((res) => res.data);
    }

    const onSuccess = () => {
      toast.success("User Created Successfully");
    };
    return useMutation({
      mutationFn: handleLogInRequest,
      onError: (error) => {
        //@ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess,
      retry: 0,
    });
  };

  const useHandleUpdateUser = (id: number) => {
    function handleLogInRequest(data: {
      firstName: string;
      lastName: string;
      roleId: string;
      email: string;
      password: string;
    }): Promise<any> {
      return axios
        .put(`/admin/update-user/${id}`, data)
        .then((res) => res.data);
    }
    const onSuccess = () => {
      toast.success("User Updated Successfully");
    };
    return useMutation({
      mutationFn: handleLogInRequest,
      onError: (error) => {
        //@ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess,
      retry: 0,
    });
  };

  const useHandleUpdateCustomer = (id: string | null) => {
    function handleLogInRequest(
      data: z.infer<typeof customerFormSchema>
    ): Promise<any> {
      return axios.put(`/customer/${id}`, data).then((res) => res.data);
    }
    const onSuccess = () => {
      toast.success("Customer Updated Successfully");
    };
    return useMutation({
      mutationFn: handleLogInRequest,
      onError: (error) => {
        //@ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess,
      retry: 0,
    });
  };

  const useHandleCreateCustomer = () => {
    function handleLogInRequest(
      data: z.infer<typeof customerFormSchema>
    ): Promise<any> {
      return axios.post(`/customer/`, data).then((res) => res.data);
    }

    const onSuccess = () => {
      toast.success("Customer Created Successfully");
    };
    return useMutation({
      mutationFn: handleLogInRequest,
      onError: (error) => {
        //@ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess,
      retry: 0,
    });
  };

  const useHandleUserExcelUpload = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    function handleUserExcelUpload(data: FormData): Promise<any> {
      return axios.post(`/user/import-excel`, data).then((res) => res.data);
    }

    return useMutation({
      mutationFn: handleUserExcelUpload,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("User Imported Successfully");
        navigate("/users/view");
      },
      onError: (error) => {
        //@ts-ignore
        toast(error.response.data.message);
      },
      retry: 0,
    });
  };

  return {
    useFetchAllUsers,
    useHandleCreateDistributor,
    useHandleUpdateDistributor,
    useFetchAllDistributors,
    useFetchDistributorById,
    useHandleCreateUser,
    useHandleUpdateUser,
    useFetchSingleUser,
    useFetchAllCustomers,
    useHandleCreateCustomer,
    useHandleUpdateCustomer,
    useFetchSingleCustomer,
    useHandleUserExcelUpload,
    verifyUser,
    useFetchSalesPerson,
  };
};

export default UserService;
//
