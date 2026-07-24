export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  urlImage: string;
  category: string;
  description: string;
}

export interface userData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface userLogin {
  email: string;
  password: string;
}

export interface userSession {
  fullName: string;
  email: string;
}

export interface CartBook {
  id: number;
  title: string;
  price: number;
  urlImage: string;
  quantity: number;
}
