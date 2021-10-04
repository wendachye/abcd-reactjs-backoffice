import moment from 'moment';

export const generateQuotationReference = (
  date: string,
  property: string,
  noOfQuotation: number,
  noOfRevision: number,
  name: string,
) => {
  const formattedDate = moment(date).format('MMDD');
  const propertyId = property === 'Residential' ? 1 : 2;

  return `BCQ-${formattedDate}-${propertyId}${noOfQuotation}${noOfRevision}-${name}`;
};

export const genereteQuotationTitle = (address: string) => {
  return `RE: QUOTATION FOR ${address}`;
};
