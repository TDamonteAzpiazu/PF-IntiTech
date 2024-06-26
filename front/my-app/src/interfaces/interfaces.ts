import { Role } from "@/enum/enum.role";

export interface Iuser_props {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country: string;
  role: Role;
}
export interface Ioperating_panels {
  id: string;
  inverter: string;
  stats: Istats_props[];
}

export interface Ipanel_for_sale {
  id: string;
  brand: string;
  model: string;
  price: number;
  description: string;
  size: string;
  daily_generation: number;
  image: string;
}
export interface Istats_props {
  id: number;
  date: string;
  energy_generated: number;
  operating_panel:Ioperating_panels;
}
export interface Iinverter {
  id: number;
  name: string;
  operating_panels: Ioperating_panels[];
}
