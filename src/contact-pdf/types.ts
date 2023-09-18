export type ContactGridDataProps = {
  id: number;
  code: number;
  razao: string;
  fantasia: string;
  document: string;
  situation: string;
  country: string;
  person: string;
  region: string;
  contactGroup: string;
  originContact: string;
};

export type ContactPdfContentProps = {
  data: ContactGridDataProps[];
  columns: {
    field: keyof ContactGridDataProps;
    header: string;
  }[];
};
