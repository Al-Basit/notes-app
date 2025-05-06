import { useMutation } from "@tanstack/react-query";

import axios from "@/lib/config/axios-instance";
import tokenService from "@/services/token.service.ts";
import { loginApiResponse } from "@/lib/types/user";
import { z } from "zod";
import { loginFormSchema } from "@/lib/schemas";
import { useAuthStore } from "@/store/auth-store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { emailSchema, otpSchema, passwordSchema } from "@/pages/auth/forgot-password";
import { BASE_PATHS_BY_ROLE } from "@/lib/constants";

const AuthService = () => {
  //Note:Replace Any from here according to the types defined acc to the backend schema.....
  //Admin Log In
  const {setUser}=useAuthStore()
  const navigate=useNavigate();
  const useHandleLoginInService = () => {
    function handleLogInRequest(
      data: z.infer<typeof loginFormSchema>
    ): Promise<loginApiResponse> {
      return axios.post(`/auth/login`, data).then((res) => res.data);
    }

    const onSuccess = (response: loginApiResponse) => {
      if(response.data.user.role==="Employee"){
       window.location.href=(`http://localhost:3000/requisitions?access_token=${response.data.access_token}`);
      }
      // else{
      //   toast.error("Only Admin can login.");
      // }
      setUser(response.data.user);
      tokenService.setUser(response.data.user);
      tokenService.setTokenRetries(5);
      tokenService.saveLocalAccessToken(response.data.access_token);
      const roleId = response.data.user?.roleId;
      const basePath =  BASE_PATHS_BY_ROLE[roleId]??"/dashboard";
      navigate(basePath)
    };
    // const onError = (error: errorType) => {
    //     toast.error(error.response.data.message);
    // };

    return useMutation({
      mutationFn: handleLogInRequest,
      onError:(error)=>{
        //@ts-ignore
        toast.error(error.response.data.message)
      },
      onSuccess,
      retry: 0,
    });
  };


  const useHandleForgotPassword = (callback:()=>void) => {
    function handleLogInRequest(
      data: z.infer<typeof emailSchema>
    ): Promise<loginApiResponse> {
      return axios.post(`/auth/forgot-password/`, data).then((res) => res.data);
    }

    const onSuccess = (response: loginApiResponse) => {
      callback();
    };
    return useMutation({
      mutationFn: handleLogInRequest,
      onError:(error)=>{
        //@ts-ignore
        toast.error(error.response.data.message)
      },
      onSuccess,
      retry: 0,
    });
  };

  const useHandleValidatePasswordChange = (callback:()=>void) => {
    function handleLogInRequest(
      data: z.infer<typeof otpSchema>
    ): Promise<loginApiResponse> {
      return axios.post(`/auth/forgot-password/validate-code`, data).then((res) => res.data);
    }

    const onSuccess = (response: loginApiResponse) => {
      callback();
    };
    return useMutation({
      mutationFn: handleLogInRequest,
      onError:(error)=>{
        //@ts-ignore
        toast.error(error.response.data.message)
      },
      onSuccess,
      retry: 0,
    });
  };
  const useHandleChangePassword = (callback:()=>void) => {
    function handleLogInRequest(
      data: z.infer<typeof passwordSchema>
    ): Promise<loginApiResponse> {
      return axios.post(`/auth/forgot-password/change-password`, data).then((res) => res.data);
    }

    const onSuccess = (response: loginApiResponse) => {
      callback();
    };
    return useMutation({
      mutationFn: handleLogInRequest,
      onError:(error)=>{
        //@ts-ignore
        toast.error(error.response.data.message)
      },
      onSuccess,
      retry: 0,
    });
  };
  return {
    useHandleLoginInService,
    useHandleChangePassword,
    useHandleForgotPassword,
    useHandleValidatePasswordChange
  };
};

export default AuthService;
