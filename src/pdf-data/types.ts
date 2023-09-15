import { GridDataType } from "../component/types";
import { ColumnsProps } from "../global/types";

export type PDFGeneratorColumnsType = {
  id: number;
  code: string;
  description: string;
  active: boolean;
  price: number;
};

export type PdfContentProps = {
  data: GridDataType[];
  columns: ColumnsProps[];
  columnsDetails: ColumnsProps[] | undefined;
  pdfType: "analitic" | "sintatic";
};
