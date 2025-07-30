import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import type { LoginSchema } from "../schemas/loginSchema"
import agent from "../API/agent"
import {  useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/RegisterSchema";
import { toast } from "react-toastify";

export const useAccount = ()=>{

    
    const queryClient = new QueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async(creds: LoginSchema) =>{
            await agent.post('/login?useCookies=true',creds)
        },
        onSuccess: async()=>{
            await queryClient.invalidateQueries({
                queryKey:['user']
            })

           
        }
    });

    const registerUser = useMutation({
        mutationFn: async(creds: RegisterSchema) =>{
            await agent.post('/account/register',creds)
        },
        onSuccess: async()=>{
            toast.success('Register Successful. Now you can Login');
            navigate('/login');
        }
    })

    const logOutUser = useMutation({
        mutationFn:async()=>{
            await agent.post('/logout');
        },
        onSuccess:()=>{
            queryClient.removeQueries({
                queryKey:['user']
                
            })
            queryClient.removeQueries({
                queryKey:['activities']
                
            })
            navigate('/');
        }
    })

    const {data:currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey:['user'],
        queryFn: async()=>{
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) 
              
    })

    return{
        loginUser,
        currentUser,
        logOutUser,
        loadingUserInfo,
        registerUser
    }
}