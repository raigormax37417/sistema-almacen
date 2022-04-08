export interface Profile {
  id? : string;
  name: string;
  controlNumber: string;
  semester: string;
  group: string;
  career: string;
  email : string;
  nombre : string;
  foto : string;
}

export interface Pedido {
  id : string;
  profile: Profile;
  tool : Tool[];
  status: statusPedido;
  date : Date;
}

export interface Tool {
  herramienta: string;
  cantidad: number;
}

export type statusPedido = "enviado" | "visto" | "camino" | "entregado";


