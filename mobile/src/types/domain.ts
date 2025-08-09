export type BusinessType = 'servico' | 'loja';

export type ProfessionalDoc = {
  id?: string;
  uid?: string;
  type: BusinessType; // serviço ou loja
  category: string;   // categoria (serviço) ou ramo (loja)
  name: string;
  phone: string;      // WhatsApp sem máscara
  avatarUrl?: string;
  featured?: boolean; // legado
  isFeatured?: boolean; // atual para destaques pagos
  status?: 'approved' | 'pending' | 'rejected';
  rating?: number; // 0..5
  updatedAt?: any;
};


