import mongoose, { Schema } from "mongoose";
import type { UserType } from "../../../shared/types/User.type";
import crypto from "crypto";

const UserSchema: Schema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    registration: { type: String, required: true },
    cpf: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
})

UserSchema.methods.setPassword = function (password: string) {
    this.passwordSalt = crypto.randomBytes(16).toString('hex');

    this.passwordHash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, 'sha512').toString('hex');

    return
}

UserSchema.methods.validatePassword = function (password: string) {
    const hash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, 'sha512').toString('hex')

    return this.passwordHash === hash;
}

export default mongoose.model<UserType>("User", UserSchema)