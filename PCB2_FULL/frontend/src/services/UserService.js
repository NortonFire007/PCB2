import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default class UserService {
  static getUserIdFromToken() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const decodedToken = jwtDecode(token);
    return decodedToken.sub;
  }
  static async getUserData() {
    try {
      const userId = this.getUserIdFromToken();
      const response = await axios.get(`http://127.0.0.1:5000/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching userdata:', error);
    }
  }

  static async getImage() {
    try {
      const userData = await this.getUserData();
      const imageData = userData.profile_image;
      return imageData;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }
}
