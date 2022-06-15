export interface Profile {
  id? : string;
  name: string;
  controlNumber: string;
  semester: string;
  group: string;
  career: string;
}

export interface Pedido {
  id : string;
  profile: Profile;
  tools : orderTool[];
  status: statusPedido;
  date : Date;
}

export interface Tool {
  herramienta: string;
  cantidad: number;
  id: string;
  date: Date;
}

export interface Roles {
  student?: Boolean
  admin?: Boolean
}
  
export interface User {
  uid: string
  email: string
  displayName?: string
  roles?: Roles
  profile?:string
}

export interface orderTool {
  tool: Tool;
  amount: number;
}

export type statusPedido = "enviado" | "visto" | "escaneado" | "prestado" | "entregado";


