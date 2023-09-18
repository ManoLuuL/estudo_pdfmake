import { FC } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Button } from "primereact/button";
import JsBarcode from "jsbarcode";
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const EtiquetasPDF: FC = () => {
  const generatePDF = () => {
    const labelsData = [
      {
        textAbove: "Etiqueta 1 - Texto Superior",
        barcode: "123456789",
        textBelow: "Texto Inferior 1",
      },
      {
        textAbove: "Etiqueta 2 - Texto Superior",
        barcode: "A1378429",
        textBelow: "Texto Inferior 2",
      },
      {
        textAbove: "Etiqueta 3 - Texto Superior",
        barcode: "XPG3200MHZ",
        textBelow: "Texto Inferior 3",
      },
      {
        textAbove: "Etiqueta 4 - Texto Superior",
        barcode: "F650W391",
        textBelow: "Texto Inferior 4",
      },
      {
        textAbove: "Etiqueta 5 - Texto Superior",
        barcode: "MAOI2391AS",
        textBelow: "Texto Inferior 5",
      },
      {
        textAbove: "Etiqueta 6 - Texto Superior",
        barcode: "0v0m0rtra",
        textBelow: "Texto Inferior 6",
      },
      {
        textAbove: "Etiqueta 7 - Texto Superior",
        barcode: "B3t0v1d4l0ka",
        textBelow: "Texto Inferior 7",
      },
      {
        textAbove: "Etiqueta 8 - Texto Superior",
        barcode: "4um3nt0",
        textBelow: "Texto Inferior 8",
      },
    ];

    const labelDefinitions = labelsData.map((labelData) => {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, labelData.barcode, { format: "CODE128" });
      const barcodeDataUrl = canvas.toDataURL("image/png");

      const content: Content = [
        {
          table: {
            widths: ["*"],
            body: [
              [{ text: labelData.textAbove, alignment: "center" }],
              [
                {
                  image: barcodeDataUrl,
                  width: 100,
                  alignment: "center",
                },
              ],
              [{ text: labelData.textBelow, alignment: "center" }],
            ],
          },
          layout: "noBorders",
          margin: [0, 10],
        },
      ];

      return content;
    });

    const labelsPerPage = 5; // Número de etiquetas por página
    const pages = [];

    for (let i = 0; i < labelDefinitions.length; i += labelsPerPage) {
      const pageLabels = labelDefinitions.slice(i, i + labelsPerPage);
      pages.push({ columns: pageLabels });
    }

    const docDefinition: TDocumentDefinitions = {
      content: pages,
      pageOrientation: "landscape",
      pageMargins: [20, 20, 20, 20],
    };

    pdfMake.createPdf(docDefinition).open();
  };

  return (
    <div>
      <Button onClick={generatePDF}>Gerar PDF</Button>
    </div>
  );
};

export default EtiquetasPDF;
