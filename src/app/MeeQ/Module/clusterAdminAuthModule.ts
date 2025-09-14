export interface LoginCredentials{
    clusterId:string,
    password:string
}
export interface SignupData {
    clusterId: string,
    adminName: string,
    emailId: string,
    organizationName: string,
    password: string
  };

export interface apiResponse{
    message:string,
    error:string,
    data?:any
}