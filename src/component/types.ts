export type GridType = {
  id: number;
  code: string;
  description: string;
  active: boolean;
  price: number;
};

export type GridProps = {
  data: GridType[];
};

export type PdfProps = GridProps & {
  title: string;
  columns: {
    field: string;
    header: string;
  }[];
};
