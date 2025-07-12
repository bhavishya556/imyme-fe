import axios from "axios"

// export const BASE_URL = 'https://server.bizelevators.com'
export const BASE_URL = 'http://localhost:5000'


export const axiosInstance = axios.create({});

export const apiConnector = ({ method, url, bodyData, headers }: any) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null
    });
}

export const AdminRoutes_API: any = {
    loginAdmin: "/api/v1/admin/login-admin",
    validateAdmin: "/api/v1/admin/validate-admin",
} 
