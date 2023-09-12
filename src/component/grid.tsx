import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { GridProps } from "./types";

const Grid: React.FC<GridProps> = ({ data }) => {
  return (
    <div className="p-grid">
      <div className="p-col">
        <DataTable value={data}>
          <Column field="id" header="ID" />
          <Column field="code" header="Código" />
          <Column field="description" header="Descrição" />
          <Column field="active" header="Ativo" />
          <Column field="price" header="Preço" />
        </DataTable>
      </div>
    </div>
  );
};

export default Grid;
