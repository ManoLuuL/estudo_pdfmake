import { ContactGridDataProps } from "./types";

export const useContactGrid = () => {
  const columns: {
    field: keyof ContactGridDataProps;
    header: string;
  }[] = [
    { field: "code", header: "Código" },
    { field: "fantasia", header: "Nome Fantasia" },
    { field: "razao", header: "Razão Social" },
    { field: "situation", header: "Situação" },
    { field: "document", header: "Documento" },
    { field: "country", header: "País" },
    { field: "contactGroup", header: "Grupo de Contatos" },
    { field: "originContact", header: "Origem" },
    { field: "region", header: "Região" },
    { field: "person", header: "Tipo de Contato" },
  ];

  const gridData: ContactGridDataProps[] = [
    {
      code: 1,
      contactGroup: "Grupo 1",
      country: "Brasil",
      document: "000000000000",
      fantasia: "Teste Fantasia",
      id: 1,
      originContact: "Origem 1",
      person: "Fisica",
      razao: "Teste Razao",
      region: "Região 1",
      situation: "Ativo",
    },
    {
      code: 2,
      contactGroup: "Grupo 2",
      country: "Brasil",
      document: "000000000000",
      fantasia: "Teste Fantasia 2",
      id: 2,
      originContact: "Origem 2",
      person: "Fisica",
      razao: "Teste Razao 2",
      region: "Região 2",
      situation: "Inativo",
    },
    {
      code: 3,
      contactGroup: "Grupo 3",
      country: "Brasil",
      document: "000000000000",
      fantasia: "Teste Fantasia 3",
      id: 3,
      originContact: "Origem 3",
      person: "Juridica",
      razao: "Teste Razao 3",
      region: "Região 3",
      situation: "Ativo",
    },
    {
      code: 4,
      contactGroup: "Grupo 4",
      country: "Brasil",
      document: "000000000000",
      fantasia: "Teste Fantasia 4",
      id: 4,
      originContact: "Origem 4",
      person: "Fisica",
      razao: "Teste Razao 4",
      region: "Região 4",
      situation: "Bloqueado",
    },
    {
      code: 5,
      contactGroup: "Grupo 5",
      country: "Brasil",
      document: "000000000000",
      fantasia: "Teste Fantasia 5",
      id: 5,
      originContact: "Origem 5",
      person: "Juridica",
      razao: "Teste Razao 5",
      region: "Região 5",
      situation: "Ativo",
    },
  ];

  return {
    columns,
    gridData,
  };
};
