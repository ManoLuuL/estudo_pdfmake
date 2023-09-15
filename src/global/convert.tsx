import { useEffect, useState } from "react";

const ImageToBase64 = (img: string) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    // Crie uma função para carregar e converter a imagem em base64
    const loadAndConvertImage = async () => {
      try {
        // Use o módulo da imagem diretamente para obter a URL
        const imageUrl = img;

        // Carregue a imagem como um blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Crie um objeto FileReader para ler o blob
        const reader = new FileReader();

        // Defina o evento de conclusão para converter a imagem em base64
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setBase64Image(reader.result);
          }
        };

        // Leia o blob como uma URL de dados (base64)
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Erro ao carregar e converter a imagem:", error);
      }
    };

    // Chame a função para carregar e converter a imagem
    loadAndConvertImage();
  }, [img]);

  return { base64Image };
};

export default ImageToBase64;
