export interface UserData {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string; // Apenas no frontend
  isActive?: boolean;
  role?: string; // Padrão 'patient'
}
