import mongoose, { Schema } from "mongoose";
import type { YoungMemberType } from "../../../shared/types/YoungMember.types";

const YoungMemberModelSchema: Schema = new Schema({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    phone: { type: String, required: true },
})

export default mongoose.model<YoungMemberType>("YoungMember", YoungMemberModelSchema)