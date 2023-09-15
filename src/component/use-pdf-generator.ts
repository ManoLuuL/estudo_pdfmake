import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import { PdfGeneratorProps } from "./types";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export const usePdfGenerator = (props: PdfGeneratorProps) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const { content, header, title, graph, type } = props;

  const newData = new Date().toLocaleString();

  const typePdf = type === "sintatic" ? "Sintatico" : "Analitico";

  const pdfGenerator = () => {
    const documentDefinition: TDocumentDefinitions = {
      header: {
        alignment: "center",
        margin: [0, 20, 0, 0],
        text: `${title} - ${typePdf}`,
        fontSize: 16,
        bold: true,
      },
      content: [
        {
          alignment: "right",
          margin: [0, 10],
          columns: [
            {
              image: `${header.image}`,
              width: 60,
            },
            {
              text: header.description,
              alignment: "left",
              margin: [10, 0],
            },
            {
              text: [
                "Emitido por\n",
                "Demonstração Luis\n",
                "Emissão\n",
                `${newData}\n`,
              ],
              alignment: "center",
            },
          ],
        },
        content,
        graph
          ? [
              {
                alignment: "center",
                margin: [0, 10],
                text: "Graficos",
                fontSize: 16,
                pageBreak: "before",
              },
              {
                alignment: "center",
                margin: [0, 10],
                columns: [
                  {
                    image: `${graph}`,
                    width: 450,
                    height: 300,
                  },
                ],
              },
            ]
          : [],
      ],
    };

    pdfMake.createPdf(documentDefinition).open();
  };

  return {
    pdfGenerator,
  };
};
