import { GridDataType } from "../component/types";
import { ColumnsProps } from "./types";

const sample = [
  {
    id: 1,
    active: false,
    code: "Codigo Venda 1",
    description: "Descrição 1",
    price: 100.0,
    details: [
      {
        id: 1,
        code: 2,
        description: "Produto 2",
        amount: 1,
        price: 50.0,
      },
      {
        id: 2,
        code: 7,
        description: "Produto 7",
        amount: 1,
        price: 50.0,
      },
    ],
  },
  {
    id: 2,
    active: false,
    code: "Codigo Venda 2",
    description: "Descrição 2",
    price: 0.0,
  },
  {
    id: 3,
    active: false,
    code: "Codigo Venda 3",
    description: "Descrição 3",
    price: 300.0,
    details: [
      {
        id: 1,
        code: 3,
        description: "Produto 3",
        amount: 1,
        price: 150.0,
      },
      {
        id: 2,
        code: 7,
        description: "Produto 7",
        amount: 1,
        price: 50.0,
      },
      {
        id: 3,
        code: 17,
        description: "Produto 17",
        amount: 1,
        price: 100.0,
      },
    ],
  },
  {
    id: 4,
    active: false,
    code: "Codigo Venda 4",
    description: "Descrição 4",
    price: 0.0,
  },
  {
    id: 5,
    active: false,
    code: "Codigo Venda 5",
    description: "Descrição 5",
    price: 50.0,
    details: [
      {
        id: 2,
        code: 7,
        description: "Produto 7",
        amount: 1,
        price: 50.0,
      },
    ],
  },
  {
    id: 6,
    active: false,
    code: "Codigo Venda 6",
    description: "Descrição 6",
    price: 0.0,
  },
  {
    id: 7,
    active: false,
    code: "Codigo Venda 7",
    description: "Descrição 7",
    price: 70.7,
    details: [
      {
        id: 1,
        code: 5,
        description: "Produto 5",
        amount: 1,
        price: 70.7,
      },
    ],
  },
  {
    id: 8,
    active: false,
    code: "Codigo Venda 8",
    description: "Descrição 8",
    price: 85.0,
    details: [
      {
        id: 1,
        code: 13,
        description: "Produto 13",
        amount: 1,
        price: 40.0,
      },
      {
        id: 2,
        code: 27,
        description: "Produto 27",
        amount: 1,
        price: 45.0,
      },
    ],
  },
  {
    id: 9,
    active: false,
    code: "Codigo Venda 9",
    description: "Descrição 9",
    price: 0.0,
  },
  {
    id: 10,
    active: false,
    code: "Codigo Venda 10",
    description: "Descrição 10",
    price: 10.0,
    details: [
      {
        id: 1,
        code: 23,
        description: "Produto 23",
        amount: 1,
        price: 10.0,
      },
    ],
  },
];

export const useGridData = () => {
  const columns: ColumnsProps[] = [
    { field: "code", header: "Código" },
    { field: "description", header: "Descrição" },
    { field: "active", header: "Ativo" },
    { field: "price", header: "Preço" },
  ];

  const columnsDetails: ColumnsProps[] = [
    { field: "code", header: "Código" },
    { field: "description", header: "Descrição" },
    { field: "amount", header: "Quantidade" },
    { field: "price", header: "Valor" },
  ];

  const gridData: GridDataType[] = [...sample];
  return {
    columns,
    gridData,
    columnsDetails,
  };
};
