import { Content } from "pdfmake/interfaces";
import { PDFGeneratorColumnsType, PdfContentProps } from "./types";
import { GridDetailsType } from "../component/types";

export const PdfContent = (props: PdfContentProps) => {
  const { data, columns, columnsDetails, type } = props;

  const typePdf = type === "analitic" ? "Analitico" : "Sintatico";

  const period = "10/04/2023 a 10/05/2023";
  const products = "Todos";
  const reportType = `${typePdf} de Vendas`;

  const totalRecords = data.length;

  const totalPriceColumnExists = columns.some((col) => col.field === "price");

  const totalPrice = totalPriceColumnExists
    ? data.reduce((total, item) => total + item.price, 0).toFixed(2)
    : "";

  const content: Content = [
    {
      table: {
        widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
        headerRows: 1,
        body: [
          [
            { text: "Período:", bold: true },
            period,
            { text: "Tipo Relatorio:", bold: true },
            products,
            { text: "Contato(s):", bold: true },
            products,
          ],
          [
            { text: "Produto(s):", bold: true },
            reportType,
            { text: "Vendedor(es):", bold: true },
            products,
            { text: "Status:", bold: true },
            products,
          ],
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 10],
    },

    {
      table: {
        headerRows: 1,
        widths: columns.map(() => "*"),
        body: [
          columns.map((col) => ({
            text: col.header,
            bold: true,
          })),
          ...data.flatMap((item) => [
            columns.map(
              (col) => item[col.field as keyof PDFGeneratorColumnsType]
            ),
            [
              item.details && columnsDetails
                ? {
                    colSpan: columns.length,
                    alignment: "center",
                    table: {
                      widths: columnsDetails.map(() => "*"),
                      body: [
                        columnsDetails.map((col) => ({
                          text: col.header,
                          bold: true,
                        })),
                        ...item.details.map((detail) =>
                          columnsDetails.map(
                            (col) => detail[col.field as keyof GridDetailsType]
                          )
                        ),
                      ],
                    },
                    layout: {
                      paddingBottom: () => 10,
                      vLineWidth: () => 0,
                      hLineWidth: () => 0,
                    },
                    margin: [10, 0, 10, 15],
                  }
                : {
                    text: "",
                    colSpan: columns.length,
                    border: [false, false, false, false],
                  },
            ],
          ]),
        ],
      },
      layout: {
        hLineColor: (i) => (i === 0 ? "black" : "gray"),
        hLineWidth: (i) => {
          if (i % 2 != 0) return 1;

          return 0;
        },
        vLineWidth: () => 0,
      },
    },
    totalPriceColumnExists
      ? {
          table: {
            widths: ["*", "*"],
            body: [
              [
                {
                  text: "Total de Registros:",
                  bold: true,
                },
                {
                  text: totalRecords,
                  bold: true,
                  alignment: "right",
                },
              ],
              [
                {
                  text: "Valor Total:",
                  bold: true,
                },
                {
                  text: totalPrice,
                  bold: true,
                  alignment: "right",
                },
              ],
            ],
          },
          layout: "lightHorizontalLines", // Adicione linhas horizontais leves à tabela
          margin: [0, 20, 0, 0],
        }
      : {
          table: {
            widths: ["*", "*"],
            body: [
              [
                {
                  text: "Total de Registros:",
                  bold: true,
                },
                {
                  text: totalRecords,
                  bold: true,
                  alignment: "right",
                },
              ],
            ],
          },
          layout: "lightHorizontalLines", // Adicione linhas horizontais leves à tabela
          margin: [0, 20, 0, 0],
        },
  ];

  return {
    content,
  };
};
