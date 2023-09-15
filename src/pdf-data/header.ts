import ImageToBase64 from "../global/convert";
import { HeaderPdf } from "../component/types";
import frg from "../assets/logo.png";

export const HeaderExtracao = () => {
  const { base64Image } = ImageToBase64(frg);

  const header: HeaderPdf = {
    description: [
      "Frg Informatica\n",
      "Av. Pres. Vargas, 64 - Labienópolis, Garça - SP, 17404-318\n",
      "(14) 3588-1100\n",
      "suporte@frgnet.com.br\n",
    ],
    image: base64Image ?? "",
  };

  return { header };
};
