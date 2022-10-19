import ImageCloud from "./ImageCloud";

export default interface Product {
  title?: string;
  description?: string;
  image?: string[];
  boost?: boolean;
  price?: number;
  category?: string;
  id?: number;
  hasCategory?: boolean;
  user?:string
}
