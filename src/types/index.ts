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
  fullPrice?: number;
};
