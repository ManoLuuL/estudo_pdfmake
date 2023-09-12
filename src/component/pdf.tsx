import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { GridType, PdfProps } from "./types";
import logo from "../assets/iconFRG.png";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfGenerator: React.FC<PdfProps> = ({ data, title, columns }) => {
  const generatePdf = () => {
    const totalRecords = data.length;
    const totalPrice = data
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);

    const documentDefinition = {
      content: [
        {
          alignment: "right", // Alinhe à direita
          margin: [0, 10],
          columns: [
            {
              image: `${logo}`, // URL/base64 da imagem
              width: 60, // Largura da imagem
            },
            {
              text: [
                "Frg Informatica\n",
                "Av. Pres. Vargas, 64 - Labienópolis, Garça - SP, 17404-318\n",
                "(14) 3588-1100\n",
                "suporte@frgnet.com.br\n",
              ],
              alignment: "left", // Alinhe à esquerda
              margin: [10, 0], // Margem esquerda
            },
          ],
        },
        {
          table: {
            headerRows: 1,
            widths: columns.map(() => "*"),
            body: [
              columns.map((col) => col.header), // Usar os nomes das colunas
              ...data.map((item) =>
                columns.map((col) => {
                  return item[col.field as keyof GridType];
                })
              ),
            ],
          },
          layout: "lightHorizontalLines",
        },
        {
          table: {
            widths: ["*", "*"],
            body: [
              ["Total de Registros:", totalRecords],
              ["Valor Total:", totalPrice],
            ],
          },
          layout: "lightHorizontalLines", // Adicione linhas horizontais leves à tabela
          margin: [0, 20, 0, 0], // Margem superior
        },
      ],
      header: {
        alignment: "center",
        margin: [0, 20, 0, 0],
        text: title,
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
      },
    };

    (window as any).pdfMake.createPdf(documentDefinition).open();
  };

  return (
    <div>
      <button onClick={generatePdf} style={{ fontSize: "40px" }}>
        Gerar PDF
      </button>
    </div>
  );
};

export default PdfGenerator;
