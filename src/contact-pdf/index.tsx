import { FC } from "react";
import { useContactGrid } from "./use-contact-grid";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { usePdfGenerator } from "../component/use-pdf-generator";
import { HeaderExtracao } from "../pdf-data/header";
import { useContactPdfContent } from "./use-contact-pdf-content";

const ContactPdf: FC = () => {
  const { columns, gridData } = useContactGrid();

  const { header } = HeaderExtracao();
  const { content } = useContactPdfContent({
    columns,
    data: gridData,
  });
  const { pdfGenerator } = usePdfGenerator({
    content,
    header,
    title: `Relatorio de Contatos`,
  });

  return (
    <>
      <h1>Contato</h1>

      <div>
        <Button
          onClick={() => {
            pdfGenerator();
          }}
        >
          Gera Relatorio de Contato
        </Button>
      </div>

      <div className="p-grid">
        <div className="p-col">
          <DataTable value={gridData}>
            <Column field="code" header="Código" />
            <Column field="fantasia" header="Nome Fantasia" />
            <Column field="razao" header="Razão Social" />
            <Column field="situation" header="Situação" />
            <Column field="document" header="Documento" />
            <Column field="country" header="País" />
            <Column field="contactGroup" header="Grupo do Contato" />
            <Column field="originContact" header="Origem do Contato" />
            <Column field="region" header="Região do Contato" />
            <Column field="person" header="Tipo do Contato" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default ContactPdf;
