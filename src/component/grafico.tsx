import { FC, MutableRefObject, useEffect } from "react";
import Chart from "chart.js/auto";

type chartProps = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
};

const ChartComponent: FC<chartProps> = ({ canvasRef }) => {
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Dados do gráfico de exemplo
    const data = {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
      datasets: [
        {
          label: "Vendas",
          data: [12, 19, 3, 5, 2],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Configurações do gráfico
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Criação do gráfico
    const myChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    return () => {
      // Limpar o gráfico ao desmontar o componente
      myChart.destroy();
    };
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} height={1000} width={1000}></canvas>
    </div>
  );
};
export default ChartComponent;
