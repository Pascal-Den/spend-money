export type OligarchType = {
  id: string;
  personName: string;
  squareImage: string;
  netWorth: number;
};

export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type ProductChangeType = {
  id: string;
  quantity: number;
  netWorth: number;
};

export type CurrencyType = {
  cc: string;
  exchangedate: string;
  r030: number;
  rate: number;
  txt: string; 
};
