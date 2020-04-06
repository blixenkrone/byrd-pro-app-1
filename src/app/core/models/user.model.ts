

export interface IProfileRequest {
  page: number;
  hits: number;
  feed: 'pro';
  query?: string;
}

interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  userPicture?: string;
  lastLogin?: number;
  age?: number;
  isAdmin: boolean;
}

interface IProCompany {
  companyEmail: string;
  companyVatNumber: string;
}

interface IStats {
  soldStories: number;
  deviceBrand: string;
  deviceModel: string;
  osSystem: string;
  salesAmount: number;
  uploadedStories: number;
}

export interface IProUser extends IUser {
  isProfessional: boolean;
  isPress: boolean;
  withdrawableAmount: number;
  stats: IStats;
  company: IProCompany;
}

export interface IMediaUser extends IUser {
  isMedia: boolean;
  id: string;
  name: string;
  country: 'denmark' | 'sweden' | 'english' | 'other';
}

// HTTP request params for profiles
interface IRequestProfiles {
  page: string;
  hits: string;
  feed: 'normal' | 'admin' | 'pro';
  query?: string
}

export declare type RequestProfiles = IRequestProfiles

// export declare type IProUser = IPro;
