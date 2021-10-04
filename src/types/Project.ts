export type QuotationSectionItemType = 'Description' | 'Single Line Item' | 'Group Item';

export interface QuotationSingleLineItemType {
  description: string;
  rate: number;
  rateType: string;
  quantity: number;
  quantityType: string;
  amount: number;
}

export interface QuotationGroupItemTye {
  title: string;
  lineItems?: QuotationSingleLineItemType[];
}

export interface QuotationSectionType {
  header: string;
  description?: string[];
  groupItems?: QuotationGroupItemTye[];
  singleLineItems?: QuotationSingleLineItemType[];
  subtotal?: number;
}

export interface QuotationType {
  reference: string;
  name?: string;
  property?: string;
  nric?: string;
  contactNo?: string;
  email?: string;
  date?: string;
  remarks?: string;
  title: string;
  subtitle: string;
  sections: QuotationSectionType[];
}

export interface ProjectType {
  uuid: string;
  name: string;
  property: string;
  address: string;
  startDate: string;
  contactNo?: string;
  nric?: string;
  email?: string;
  remarks?: string;
  quotations: QuotationType[];
}
