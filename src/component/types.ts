import { Content } from "pdfmake/interfaces";

export type GridDetailsType = {
  id: number;
  code: number;
  description: string;
  amount: number;
  price: number;
};

export type GridDataType = {
  id: number;
  code: string;
  description: string;
  active: boolean;
  price: number;

  details?: GridDetailsType[];
};

export type GridProps = {
  data: GridDataType[];
};

export type HeaderPdf = {
  image?: string;
  description: string[];
};

export type PdfGeneratorProps = {
  title: string;
  header: HeaderPdf;
  graph?: string;
  content: Content;
  type?: "analitic" | "sintatic";
};
