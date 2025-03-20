export type User = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  isdCode: string;
  contactNumber: string;
  password: string;
};

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
