import { serverApi } from "../../lib/config";
import axios from "axios";
import { Furniture, FurnitureInquiry } from "../../lib/types/furnitures";

class FurnitureService {
    private readonly path:string;
    constructor() {
        this.path = serverApi
    }

    public async getFurnitures(input: FurnitureInquiry): Promise<Furniture[]> {
        try {
          let url = `${this.path}/Furniture/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
          if (input.furnitureCollection)
            url += `&FurnitureCollection=${input.furnitureCollection}`;
          if (input.search) url += `&search=${input.search}`;
      
          const result = await axios.get(url);
          console.log("getFurnitures:", result);
      
          return result.data;
        } catch (err) {
          console.log("Error, getFurniture:", err);
          throw err;
        }
      }
  
    public async getFurniture(FurnitureId:string):Promise<Furniture> {
      try {
        const url = `${this.path}/furniture/${FurnitureId}`;
        const result = await axios.get(url, {withCredentials: true});
        return result.data;
      } catch (err) {
        console.log("Error, getFurniture:", err);
        throw err;
      }
    }
      
}

export default FurnitureService;