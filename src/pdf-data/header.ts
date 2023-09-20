import ImageToBase64 from "../global/convert";
import { HeaderPdf } from "../component/types";
import icon from "../assets/icon.png";

export const HeaderExtracao = () => {
  const { base64Image } = ImageToBase64(icon);

  const header: HeaderPdf = {
    description: [
      "AAAAAAAA\n",
      "Rua, 64 - Labie, Garça - SP, 17434-218\n",
      "(14) 3228-1220\n",
      "suporte@suport.com.br\n",
    ],
    image: base64Image ?? "",
  };

  return { header };
};
