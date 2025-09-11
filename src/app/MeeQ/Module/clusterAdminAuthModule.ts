export interface LoginCredentials{
    clusterId:string,
    password:string
}

export interface apiResponse{
    message:string,
    error:string,
    data?:object
}