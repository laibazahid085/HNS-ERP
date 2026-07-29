export interface Company {
  id: string;
  code: string;
  name: string;
  shortName?: string;
  email?: string;
  phone: string;
  whatsapp?: string;
  ntn?: string;
  strn?: string;
  website?: string;
  address?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
  logoUrl?: string;
  status: "Active" | "Inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanyFormData {
  code: string;
  name: string;
  shortName: string;
  email: string;
  phone: string;
  whatsapp: string;
  ntn: string;
  strn: string;
  website: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  status: "Active" | "Inactive";
}