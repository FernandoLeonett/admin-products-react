export default interface Product {
  title?: string;
  description?: string;
  // image?: ImageFireBse[];
  image?: string[];
  boost?: boolean;
  price?: number;
  category?: string;
  id?: string;
  hasCategory?: boolean;
  user?: string;
}
