import { ObjectId } from "mongodb";
import { FurnitureCapacity, FurnitureCollection, FurnitureSize, FurnitureStatus } from "../enums/furniture.enum";

export interface Furniture {
    _id: string;
    furnitureStatus: FurnitureStatus;
    furnitureCollection: FurnitureCollection;
    furnitureRanking: number;
    furnitureName: string;
    furniturePrice: number;
    furnitureLeftCount: number;
    furnitureSize: FurnitureSize;
    furnitureCapacity: FurnitureCapacity;  
    furnitureDesc?: string;
    furnitureImages: string[];
    furnitureViews: number;
}


export interface FurnitureInquiry {
    order: string;
    page: number;
    limit: number;
    furnitureCollection?: FurnitureCollection;
    search?: string;
}

export interface FurnitureInput {
    furnitureStatus?: FurnitureStatus;
    furnitureCollection: FurnitureCollection;
    furnitureName: string;
    furniturePrice: number;
    furnitureLeftCount: number;
    furnitureSize?: FurnitureSize;
    furnitureVolume?: number;
    furnitureDesc?: string;
    furnitureImages: string[];
}

export interface FurnitureUpdateInput {
    _id: ObjectId;
    furnitureStatus?: FurnitureStatus;
    furnitureCollection?: FurnitureCollection;
    furnitureName?: string;
    furniturePrice?: number;
    furnitureLeftCount?: number;
    furnitureSize?: FurnitureSize;
    furnitureVolume?: number;
    furnitureDesc?: string;
    furnitureImages?: string[];
    furnitureViews?: number;
}
