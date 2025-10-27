import axios from "axios"


export const axiosInstance = axios.create({
    withCredentials: true, // Include cookies in requests
});

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
