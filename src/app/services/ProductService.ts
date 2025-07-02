import { serverApi } from "../../lib/config";
import axios from "axios";
import { Furniture, FurnitureInquiry } from "../../lib/types/furniture";

class FurnitureService {
  static getFurnitures(arg0: { page: number; limit: number; order: string; furnitureCollection: import("../../lib/enums/furniture.enum").FurnitureCollection; }) {
      throw new Error("Method not implemented.");
  }
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getFurnitures(input: FurnitureInquiry,): Promise<Furniture[]> {
    try {
      const url = `${this.path}/furniture/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      const result = await axios.get(url);
      console.log("Fetched Furnitures:", result.data);
      return result.data;
    } catch (err) {
      console.log("Error fetching furnitures:", err);
      throw err;
    }
  }

  public async getFurniture(furnitureId: string): Promise<Furniture> {
  try {
    const url = `${this.path}/furniture/${furnitureId}`;
    console.log("Fetching furniture from:", url);
    const result = await axios.get(url, { withCredentials: true });
    console.log("Furniture data received:", result.data);
    return result.data;
  } catch (err) {
    console.log("Error, getFurniture:", err);
    throw err;
  }
}

    

    public async getComingSoon(limit = 4): Promise<Furniture[]> {
      const url = `${this.path}/coming?limit=${limit}`;
      const result = await axios.get(url);
      console.log("Fetched Coming Soon Furnitures:", result.data);
      return result.data;
    }
  
   
  }
  


export default FurnitureService;
