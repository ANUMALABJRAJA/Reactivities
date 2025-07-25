import axios from 'axios'
import { store } from '../stores/store'
import { toast } from 'react-toastify'
import { router } from '../../app/router/Routes'

const sleep = (delay:number)=>{
    return new Promise(resolve =>{
        setTimeout(resolve,delay)
    })
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

agent.interceptors.request.use(config =>{
    store.uiStore.isBusy();
    return config;
})


agent.interceptors.response
    .use(async response=>{
        await sleep(1000);
        store.uiStore.isIdle();
        return response;
    },
async (errors) =>{
    await sleep(1000);
    store.uiStore.isIdle();
    //console.log("Axios Error : " + errors );

    const{status, data} = errors.response;
    //console.log(status);

    switch (status) {
        case 400:
            if(data.errors)
            {
                const modelStateErrors = [];
                for(const key in data.errors)
                {
                    if(data.errors[key])
                    {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            else{
                toast.error(data);
            }
            toast.error('Bad request');
            break;
        case 401:
            toast.error('UnAuthorized');
            break;
        case 404:
            router.navigate('/not-found');
            toast.error("Not found");
            break;
        case 500:
            router.navigate('/server-error',{state:{error:data}})
            toast.error("Server Error");
            break;
        default:
            break;
    }


    return Promise.reject(errors);
}


)

export default agent; 