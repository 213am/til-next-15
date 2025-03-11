export interface IGoodDataType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRatingType;
}

interface IRatingType {
  rate: number;
  count: number;
}
