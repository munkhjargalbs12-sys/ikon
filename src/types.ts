export type Address = {
  city: string;
  district: string;
  khoroo: string;
  building: string;
  entrance: string;
  floor: string;
  door: string;
};

export type CompanyFormData = {
  companyName: string;
  registerId: string;
  representative: string;
  phone: string;
  email: string;
  address: Address;
};

export type IrgenFormData = {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  address: Address;
};
