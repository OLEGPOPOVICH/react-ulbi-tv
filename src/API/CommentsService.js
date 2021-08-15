import axios from "axios";

export default class CommentsService {
  static async getAll(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

    return response;
  }
}