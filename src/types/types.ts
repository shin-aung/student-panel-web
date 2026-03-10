export interface StudentDto {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  student: StudentDto;
}

export interface Session {
  token: string;
  student: StudentDto;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  password: string;
  confirmPassword: string;
}

export interface NavItem {
  id: string;
  icon: string;
  label: string;
}

export interface StatCard {
  icon: string;
  val: string;
  label: string;
}