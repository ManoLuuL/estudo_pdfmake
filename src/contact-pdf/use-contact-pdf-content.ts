import { Content } from "pdfmake/interfaces";
import { ContactPdfContentProps } from "./types";

export const useContactPdfContent = (props: ContactPdfContentProps) => {
  const { data, columns } = props;

  const content: Content = data.map((contact) => {
    const table = {
      widths: ["*", "*"],
      body: columns.map((column) => [
        { text: `${column.header}:`, bold: true },
        { text: contact[column.field].toString() },
      ]),
    };

    return { table, layout: "lightHorizontalLines", margin: [0, 15] };
  });

  return {
    content,
  };
};
