import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>

@Schema({
    timestamps: true
})

export class Category {
    @Prop()
    title: string

    @Prop()
    image: string

    @Prop()
    parent_id: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)