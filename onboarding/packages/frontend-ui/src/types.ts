export type StoreType = {
  loading: boolean;
  userSession: UserSessionType;
};

export type LoginResponseType = {
  message: string;
  expiresIn: number;
  access_token: string;
  userId: string;
  userEmail: string;
};

export type notificationType = {
  unread: any;
};

export type ForgotPasswordResType = {
  message: string;
  expiresIn: number;
  access_token: string;
  userId: string;
};

export type AppType = {
  userSession: UserSessionType;
  loading: boolean;
  emailError: any;
  forgotToken: any;
  getapi: boolean;
};

export type UserSessionType = {
  user: LoginResponseType | null;
  error: string | null;
  store: AppType | null;
};
export type EmailSessionType = {
  error: string | null;
};
export type RoleType = {
  id: number;
  role: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  isActive: string;
};

export type UserRoleType = {
  id: number;
  userId: string;
  roleId: number;
};

export type EmployeeType = {
  fname: string;
  lname: string;
  designation: string;
  email: string;
  mobnumber: number;
  homenumber: number;
  role: string;
  reportingManager: string;
  userId: string;
};

export type UserType = {
  email: string;
  password: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  isActive: string;
  mobile: number;
  userId: string;
};

export type EmployeeListType = {
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  id: string;
  manager: string;
  role: [];
};

export type TableColumn = {
  title: string;
  dataIndex: string;
  key: string;
};

export type SidebarOptionsType = {
  role: string;
  routes: RouteType[];
};

export type RouteType = {
  option: string;
  icon: JSX.Element;
  route: string;
};

export type UserDataResponseType = {
  lastLogin: any;
  firstName: string;
  lastName: string;
  profilePicture: string;
  userId: string;
  userRole: string;
  email: string;
  mobile: string;
  firstTimeLogin: any;
  userToken: string;
};
export type mailTokenTypes = {
  forgot: object | null;
};
export type resetPasswordType = {
  password: string;
};

export type CandidateType = {
  fname: string;
  lname: string;
  email: string;
  mobile: string;
  jobId: any;
  recruiterId: any;
  roleId: any;
  statusCode: any;
};
export type ClientType = {
  cname: string;
  jobid: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  isActive: string;
};

export type CandidateDataType = {
  clientName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  jobId: string;
};

export type CandidateBasicInfoType = {
  fname: any;
  lname: any;
  parentFirstName: any;
  parentLastName: any;
  aadhaarCard: any;
  emergencyPhone: any;
  emergencyContactName: any;
  emergencyEmail: any;
  gender: any;
  panCard: any;
  dateBirth: any;
  passport: any;
  homePhone: any;
  bloodGroup: any;
  allergies: any;
  userId: any;
};

export type addressType = {
  addressId: number;
  addressType: string;
  address: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zip: string;
  userId: any;
};

export type educationType = {
  id: number;
  institute: string;
  startDate: Date;
  completionDate: Date;
  degree: string;
  grade: number;
  subjects: string;
  zip: string;
  userId: string;
  email: string;
  isActive: any;
  mobile: number;
};
export type offerTypes = {
  location: string;
  D5: number;
  D6: number;
  D9: number;
  D10: number;
  D11: number;
  D12: number;
  D13: number;
  D14: number;
  D15: number;
  D18: number;
  D19: number;
  D20: number;
  D21: number;
  D23: number;
  mobile: any;
  email: string;
  fullName: string;
  workStartDate: string;
  client: string;
  designation: string;
  id: number;
  modeOfEmp: string;
  panCard: string;
  releaseNumber: number;
  offerid: number;
  statusCode:any
};

export type OfferType = {
  CandidateName: string;
  DOJ: Date;
  Location: string;
  Laptop: string;
  Designation: string;
  Rate: Number;
  CTC: Number;
  SOW: Date;
  ClientName: string;
  ModeOfEmployment: string;
  createdBy: string;
  updatedBy: string;
  isActive: string;
  modeOfEmployment: string;
  bgv: boolean;
  pf: boolean;
  insurance: boolean;
};

export type AssetType = {
  model: string;
  processorType: string;

  ram: string;
  storageType: string;

  storageSpace: string;
};

export type OfferTypeForNegotiate = {
  hireDate: any;
  workStartDate: any;
  rate: number;
  ctc: number;
  location: string;
  designation: string;
  uid: string;
};
