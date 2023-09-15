import { useRef, useState } from "react";
import Grid from "./component/grid";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import "./App.css";
import Chart from "./component/grafico";
import { usePdfGenerator } from "./component/use-pdf-generator";
import { HeaderExtracao } from "./pdf-data/header";
import { PdfContent } from "./pdf-data/content";
import { useGridData } from "./global/use-grid-data";
import { ColumnsProps } from "./global/types";

function App() {
  const { columns, gridData, columnsDetails } = useGridData();

  const [columnsPdf, setColumnsPdf] = useState<ColumnsProps[]>([]);
  const [columnsDetailsPdf, setColumnsDetailsPdf] = useState<ColumnsProps[]>(
    []
  );

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  //-------------- NEW ----------------
  const [type, setType] = useState<"analitic" | "sintatic">("sintatic");

  const { header } = HeaderExtracao();
  const { content } = PdfContent({
    columns:
      columnsPdf.length > 0
        ? columnsPdf
        : [
            { field: "code", header: "Código" },
            { field: "description", header: "Descrição" },
          ],
    data: gridData,
    columnsDetails: type === "analitic" ? columnsDetailsPdf : undefined,
    type,
  });
  const { pdfGenerator } = usePdfGenerator({
    content: content,
    header: header,
    title: `Relatorio de Vendas`,
    graph: type === "analitic" ? canvasRef.current?.toDataURL("png") : "",
    type,
  });
  // -----------------------------------

  const handleColumnToggle = (field: string) => {
    if (columnsPdf.some((column) => column.field === field)) {
      setColumnsPdf(columnsPdf.filter((column) => column.field !== field));
    } else {
      setColumnsPdf([
        ...columnsPdf,
        columns.find((column) => column.field === field)!,
      ]);
    }
  };

  const handleColumnToggleDetails = (field: string) => {
    if (columnsDetailsPdf.some((column) => column.field === field)) {
      setColumnsDetailsPdf(
        columnsDetailsPdf.filter((column) => column.field !== field)
      );
    } else {
      setColumnsDetailsPdf([
        ...columnsDetailsPdf,
        columnsDetails.find((column) => column.field === field)!,
      ]);
    }
  };

  return (
    <>
      <div>
        <h1>New PDF Make</h1>
        <Button
          onClick={() => {
            pdfGenerator();
          }}
        >
          Gera Sintetico
        </Button>
        <Button
          onClick={() => {
            setIsDialogVisible(true);
            setType("analitic");
          }}
        >
          Gera Analitico
        </Button>
      </div>
      {isDialogVisible && (
        <Dialog
          visible={isDialogVisible}
          style={{ width: "50vw" }}
          header="Selecionar Campos"
          onHide={() => {
            setIsDialogVisible(false);
            setType("sintatic");
          }}
        >
          <div>
            <h2>Selecione os campos desejados:</h2>
            <ul>
              {columns.map((column) => (
                <li key={column.field}>
                  <Checkbox
                    inputId={column.field}
                    value={column.field}
                    checked={columnsPdf.some((c) => c.field === column.field)}
                    onChange={() => handleColumnToggle(column.field)}
                  />
                  <label htmlFor={column.field}>{column.header}</label>
                </li>
              ))}
            </ul>

            <h2>Selecione os Detalhes desejados:</h2>
            <ul>
              {columnsDetails.map((column) => (
                <li key={column.field}>
                  <Checkbox
                    inputId={column.field}
                    value={column.field}
                    checked={columnsDetailsPdf.some(
                      (c) => c.field === column.field
                    )}
                    onChange={() => handleColumnToggleDetails(column.field)}
                  />
                  <label htmlFor={column.field}>{column.header}</label>
                </li>
              ))}
            </ul>

            <Button
              label="fechar"
              icon="pi pi-times"
              onClick={() => {
                setIsDialogVisible(false);
                setType("sintatic");
              }}
              className="p-button-secondary"
            />
            <Button
              label="Gerar PDF"
              onClick={() => {
                columnsPdf.length > 0 &&
                  columnsDetailsPdf.length > 0 &&
                  pdfGenerator();

                setIsDialogVisible(false);
              }}
              className="p-button-secondary"
            />
          </div>
        </Dialog>
      )}

      <Grid data={gridData} />
      <Chart canvasRef={canvasRef} />
    </>
  );
}

export default App;
