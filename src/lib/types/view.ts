import { ObjectId } from "mongodb";
import { ViewGroup } from "../enums/view.enum"; // adjust this as needed

export interface View {
    _id: ObjectId;
    viewGroup: ViewGroup;
    memberId: ObjectId;
    viewRefId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface ViewInput {
    memberId: ObjectId;
    viewRefId: ObjectId;
    viewGroup: ViewGroup;
}