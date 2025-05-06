import axios from "@/lib/config/axios-instance";
import {
  fetchAllProductsApiResponse,
  fetchSingleProductApiResponse,
} from "@/lib/types/products";
import CategoryPage from "@/pages/categories";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductsService = () => {
  const useFetchAllProducts = (
    page?: number,
    limit?: number,
    searchQuery?: string,
    isActive?: boolean,
    selectedCategory?: string,
    priceSort?: string | "ASC" | "DESC",
    dateSort?: string,
  ) => {
    function fetchProduct(): Promise<fetchAllProductsApiResponse> {
      let url = "/product/all";
  
      const queryParams: string[] = [];
      if (page !== undefined) queryParams.push(`page=${page}`);
      if (limit !== undefined) queryParams.push(`limit=${limit}`);
      if (searchQuery) queryParams.push(`query=${encodeURIComponent(searchQuery)}`);
      //@ts-ignore
      if (isActive !== undefined && isActive !== "all" && isActive !== "")
        queryParams.push(`isActive=${isActive}`);
      if (
        selectedCategory !== "all" &&
        selectedCategory !== undefined &&
        selectedCategory !== ""
      )
        queryParams.push(`categoryId=${selectedCategory}`);
      if (priceSort) queryParams.push(`priceSort=${priceSort}`);
      if (dateSort) queryParams.push(`dateSort=${dateSort}`);
  
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
      return axios.get(url).then((res) => res.data);
    }
  
    return useQuery({
      queryFn: fetchProduct,
      queryKey: [
        "products",
        page,
        limit,
        searchQuery,
        isActive,
        selectedCategory,
        priceSort,
        dateSort,
      ],
    });
  };
  
  const useFetchSingleProduct = (id: string | number | null) => {
    function fetchProduct(): Promise<fetchSingleProductApiResponse> {
      return axios.get(`/product/${id}`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchProduct,
      queryKey: ["product", id],
      enabled: !!id,
    });
  };
  const useHandleAddProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    function handleAddProduct(data: FormData): Promise<any> {
      return axios.post(`/product`, data).then((res) => res.data);
    }

    return useMutation({
      mutationFn: handleAddProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product Created Successfully");
        navigate("/products/view");
      },
      onError: (error) => {
        //@ts-ignore
        toast(error.response.data.message);
      },
      retry: 0,
    });
  };
  const useHandleProductExcelUpload = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    function handleProductExcelUpload(data: FormData): Promise<any> {
      return axios.post(`/product/import`, data).then((res) => res.data);
    }

    return useMutation({
      mutationFn: handleProductExcelUpload,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product Imported Successfully");
        navigate("/products/view");
      },
      onError: (error) => {
        //@ts-ignore
        toast(error.response.data.message);
      },
      retry: 0,
    });
  };
  const useHandleEditProduct = (productId: string | number | null) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    function handleAddProduct(data: FormData): Promise<any> {
      return axios.put(`/product/${productId}`, data).then((res) => res.data);
    }

    return useMutation({
      mutationFn: handleAddProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        navigate("/products/view");
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
        toast.success("Product Edited Successfully");
      },
      onError: (error) => {
        //@ts-ignore
        toast(error.response.data.message);
      },
      retry: 0,
    }
    ); 
  };

  const useHandleDeleteProduct = () => {
    const queryClient = useQueryClient();
    async function deleteProduct(id: string | number): Promise<any> {
      return axios.delete(`/product/${id}`).then((res) => res.data);
    }

    return useMutation({
      mutationFn: deleteProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product Deleted Successfully");
      },
      onError: (error) => {
        //@ts-ignore
        toast.error(
          error.response?.data?.message || "Failed to delete product"
        );
      },
      retry: 0,
    });
  };

  // const useFetchAllInventoryProducts = (searchQuery = "") => {
  //   function fetchProducts({ pageParam = 1 }): Promise<any> {
  //     return axios
  //       .get(
  //         `/product/all?page=${pageParam}&limit=10&query=${encodeURIComponent(
  //           searchQuery
  //         )}`
  //       )
  //       .then((res) => res.data);
  //   }

  //   return useInfiniteQuery({
  //     queryFn: fetchProducts,
  //     queryKey: ["products", searchQuery],
  //     getNextPageParam: (page) =>
  //       page.page === page.lastPage ? undefined : page.page + 1,
  //     //@ts-ignore
  //     select: (data) => data.pages.flatMap((page) => page.data || []),
  //   });
  // };

  const useFetchAllInventoryProducts = (searchQuery: string = "", categoryId: string = "") => {
    function fetchProducts({ pageParam = 1 }: { pageParam: number }): Promise<any> {
      const queryParams = new URLSearchParams({
        page: String(pageParam),
        limit: "10",
        ...(searchQuery && { query:searchQuery }),
        ...(categoryId && { categoryId }),
      });
  
      return axios
        .get(`/product/all?${queryParams.toString()}`)
        .then((res) => res.data);
    }
  
    return useInfiniteQuery({
      queryFn: fetchProducts,
      queryKey: ["products", searchQuery, categoryId],
      getNextPageParam: (page) => {
        if (!page.data || page.data.length === 0) return undefined;
  
        return page.page === page.lastPage ? undefined : page.page + 1;
      },
      select: (data) => data.pages.flatMap((page) => page.data || []),
    });
  };
  
  
  return {
    useFetchAllProducts,
    useHandleAddProduct,
    useFetchSingleProduct,
    useHandleProductExcelUpload,
    useHandleEditProduct,
    useHandleDeleteProduct,
    useFetchAllInventoryProducts,
  };
};

export default ProductsService;
