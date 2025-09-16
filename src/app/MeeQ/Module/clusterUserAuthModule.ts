export interface SignupData {
  fullname: string,
  username: string,
  emailId: string,
  clusterId: string,
  password: string
};

// -------------------------------------------- login Request ----------------------------------------------

export interface LoginData {
  username?: string;
  email?: string;
  password: string;
}

// -------------------------------------------- ClusterUserData ----------------------------------------------

export interface ClusterUserData {
  _id: string;
  Cluster_ID: string;
  emailID: string;
  fullname:string;
  username:string;
}