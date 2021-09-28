export interface QuotationSectionItemType {
  rate: number;
  rateType: string;
  quantity: number;
  quantityType: string;
  amount: number;
}

export interface QuotationSectionType {
  title: string;
  subtitle: string;
  items: QuotationSectionItemType[];
  subtotal: number;
}

export interface QuotationType {
  reference: string;
  name: string;
  nric: string;
  date: string;
  contact: string;
  email?: string;
  remarks?: string;
  title: string;
  subtitle: string;
  sections: QuotationSectionType[];
}

export interface ProjectType {
  uuid: string;
  name: string;
  property: string;
  nric: string;
  address: string;
  contactNo: string;
  startDate: string;
  email?: string;
  remarks?: string;
  quotations: QuotationType[];
}
