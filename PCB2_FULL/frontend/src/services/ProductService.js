import $api from '../http';

export default class ProductService {
  static async getProducts() {
    return $api.get('/products/search');
  }

  static async getNewProducts() {
    return $api.get('/products/search?order=novelty&amount=12');
  }

  static async getProductsForYou() {
    return $api.get('/products/for_you');
  }

  static async postProducts() {
    return $api.post('/products');
  }

  static async searchProducts(query) {
    return $api.get(`/products/search?query=${query}`);
  }
}
