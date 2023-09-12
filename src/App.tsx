import Grid from "./component/grid";
import PDFGenerator from "./component/pdf";
import { GridType } from "./component/types";

function App() {
  const rand = Math.random() * 200;
  const data: GridType[] = Array(Math.ceil(rand))
    .fill(0)
    .map((_, i) => ({
      id: i,
      price: parseFloat((Math.random() * 10 * i).toFixed(2))!,
      active: i % 2 === 0,
      code: `Código do Produto ${i}`,
      description: `Produto ${i}`,
    }));

  const columns = [
    { field: "id", header: "ID" },
    { field: "code", header: "Código" },
    { field: "description", header: "Descrição" },
    { field: "active", header: "Ativo" },
    { field: "price", header: "Preço" },
  ];

  return (
    <div className="App">
      <h1>FRG Marcas</h1>
      <PDFGenerator data={data} title="Produtos" columns={columns} />
      <Grid data={data} />
    </div>
  );
}

export default App;
