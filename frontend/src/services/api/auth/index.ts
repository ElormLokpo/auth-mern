import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/constants";
import { IAuth, IResponse } from "../types";
import { storeAuthState } from "@/services/redux/reducers/auth-slice";

export const AuthApi = createApi({
    reducerPath: "AuthApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        register: builder.mutation<Partial<IResponse>, IAuth>({
            queryFn: async (args, { dispatch }, _extraOptions, baseQuery) => {

                const response = await baseQuery({
                    url: "/auth/register",
                    method: "POST",
                    body: args,
                })

                if (response.data) {
                    const { message, success, data } = response.data as IResponse;

                    if (success == true) {
                        let { token, response_body: currentUser } = data;
                        dispatch(storeAuthState({ token, currentUser }))
                    }
                    return { data: { message, success } };
                }


                return { data: { message: "Something went wrong", success: false } }
            }
        }),

        login: builder.mutation<Partial<IResponse>, IAuth>({
            queryFn: async (args, { dispatch }, _extraOptions, baseQuery) => {

                const response = await baseQuery({
                    url: "/auth/login",
                    method: "POST",
                    body: args,
                })

                if (response.data) {
                    const { message, success, data } = response.data as IResponse;

                    if (success == true) {
                        let { token, response_body: currentUser } = data;
                        dispatch(storeAuthState({ token, currentUser }))
                    }
                    return { data: { message, success } };
                }


                return { data: { message: "Something went wrong", success: false } }
            }
        }),
        validateOtp: builder.mutation<Partial<IResponse>, any>({
            queryFn: async (args, _dispatch, _extraOptions, baseQuery) => {

                const response = await baseQuery({
                    url: "/auth/validate-otp",
                    method: "POST",
                    body: args,
                })

                if (response.data) {
                    const { message, success } = response.data as IResponse;

                    return { data: { message, success } };
                }


                return { data: { message: "Something went wrong", success: false } }
            }
        }),
        requestOtp: builder.mutation<Partial<IResponse>, any>({
            queryFn: async (args, _dispatch, _extraOptions, baseQuery) => {

                const response = await baseQuery({
                    url: "/auth/request-otp",
                    method: "POST",
                    body: args,
                })

                if (response.data) {
                    const { message, success } = response.data as IResponse;

                    return { data: { message, success } };
                }


                return { data: { message: "Something went wrong", success: false } }
            }
        }),


    }),



})


export const { useRegisterMutation, useLoginMutation, useValidateOtpMutation, useRequestOtpMutation } = AuthApi;