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

  const detailsArray = data
    .map((item) => item.details)
    .filter((details) => details !== undefined);
  console.log(detailsArray);

  // Extrair os detalhes de todos os itens
  const allDetails = data
    .map((item) => item.details)
    .filter((details) => details !== undefined)
    .flat();

  // Criar um mapa para calcular as somas dos produtos
  const productSummaryMap = new Map();
  allDetails.forEach((detail) => {
    if (!productSummaryMap.has(detail?.description)) {
      productSummaryMap.set(detail?.description, {
        description: detail?.description,
        quantity: detail?.amount,
        totalValue: detail?.price,
      });
    } else {
      const existingProduct = productSummaryMap.get(detail?.description);
      existingProduct.quantity += detail?.amount;
      existingProduct.totalValue += detail?.price;
    }
  });

  // Converter o mapa de resumo em uma matriz
  const productSummary = Array.from(productSummaryMap.values());

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
    {
      alignment: "center",
      margin: [0, 10],
      text: "Resumos",
      fontSize: 16,
      pageBreak: "before",
    },
    {
      alignment: "center",
      table: {
        widths: ["*", "*", "*"],
        headerRows: 1,
        body: [
          [
            { text: "Produto", bold: true },
            { text: "Quantidade", bold: true },
            { text: "Valor Total", bold: true },
          ],
          ...productSummary.map((product) => [
            product.description,
            product.quantity,
            product.totalValue.toFixed(2),
          ]),
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 10],
    },
  ];

  return {
    content,
  };
};
