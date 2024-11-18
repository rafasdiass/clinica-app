export interface UserData {
  uid?: string; // Definido pelo backend
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'doctor' | 'patient' | 'employee'; // Backend define
  phoneNumber?: string;
  cpf: string; // Adicionado para suportar CPF
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
