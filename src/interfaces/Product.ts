import ImageFireBse from "./ImageFIreBase";


export default interface Product {
  title?: string;
  description?: string;
  image?: ImageFireBse[];
  boost?: boolean;
  price?: number;
  category?: string;
  id?: string;
  hasCategory?: boolean;
  user?:string
}
