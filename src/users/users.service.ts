import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User, UserDocument } from "./users.schema"
import { Model } from "mongoose"
import * as bcrypt from "bcrypt"
import { IError, IReturn } from "shared/types"
import { AuthService } from "shared/services/auth-service"

interface ReturnInterface extends IReturn {
    user: User,
    token?: string
}

@Injectable()
export class UsersServices {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private auth_service: AuthService) {}

    async all(): Promise<User[]> {
        let users = await this.userModel.find().exec()
        return users
    }

    async create(user: User): Promise<ReturnInterface | IError> {
        try{
            let checkuser = await this.userModel.findOne({email: user.email}).exec()
            if(checkuser)
            {
                return {
                    error: {
                        message: 'email already exist'
                    }
                }
            }
                
            user.password = await bcrypt.hash(user.password, 12)
            const userData = new this.userModel(user)
            let _user = await userData.save()
            let token = await this.auth_service.auth_sign(_user)
            return {
                status: 200,
                message: "User created successfully",
                user: _user,
                token: token
            }
        }
        catch (err) {
            let _er = JSON.stringify(err)
            throw new HttpException('server error found: ' + _er, HttpStatus.BAD_REQUEST)
        }
    }
}