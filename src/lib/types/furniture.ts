
import {
    FurnitureCollection,
    FurnitureStatus,
    FurnitureSize,
    FurnitureCapacity
} from "../enums/furniture.enum";

export interface Furniture {
    _id: string;
    furnitureStatus: FurnitureStatus;
    furnitureCollection: FurnitureCollection;
    furnitureRanking:number;
    furnitureName: string;
    furniturePrice: number;
    furnitureLeftCount: number;
    furnitureSize: FurnitureSize;
    furnitureCapacity: FurnitureCapacity;
    furnitureDesc?: string;
    furnitureImages: string[];
    furnitureViews: number;
}

export interface FurnitureInput {
    furnitureStatus?: FurnitureStatus;
    furnitureCollection: FurnitureCollection;
    furnitureName: string;
    furniturePrice: number;
    furnitureLeftCount: number;
    furnitureSize?: FurnitureSize;
    furnitureCapacity?: FurnitureCapacity;
    furnitureDesc?: string;
    furnitureImages: string[];
    furnitureViews: number;
}

export interface FurnitureUpdateInput {
    _id: string
    ;
    furnitureStatus?: FurnitureStatus;
    furnitureCollection?: FurnitureCollection;
    furnitureName?: string;
    furniturePrice?: number;
    furnitureLeftCount?: number;
    furnitureSize?: FurnitureSize;
    furnitureCapacity?: FurnitureCapacity;
    furnitureDesc?: string;
    furnitureImages?: string[];
    furnitureViews?: number;
}
