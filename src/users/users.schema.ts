import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    parent_id: string

    @Prop({required: true})
    createdTime: string

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)