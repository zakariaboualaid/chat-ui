import type { ObjectId } from "mongodb";
import type { Timestamps } from "./Timestamps";

export interface StudyGuide extends Timestamps {
    _id: ObjectId;

    studyGuideId: string;

    itemCount: number;
    moduleCount: number;

    items: any[];

    totalDuration: number;
}