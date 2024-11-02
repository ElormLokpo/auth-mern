import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/constants";

export const PingApi = createApi({
    reducerPath: "PingApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        ping: builder.query({
            queryFn: async (_args, _dispatch, _extraOptions, baseQuery)=>{
                let response = await baseQuery({
                    url:"/ping",
                    method: "GET"
                })

                if(response.data){
                    const {message} = response.data as any;
                    console.log(message);

                    return {data:{message}}
                }

                return {data:{message: "No Ping"}}
            }
        })
    })
})

export const {usePingQuery} = PingApi;