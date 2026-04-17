import { NextFunction, Request, Response } from "express";
import { IUser, SignupRequest } from "../../auth.dto";
import UserModel from "../../models/user.model";
import { Model } from "mongoose";
import UserRepository from "../../DB/repository/user.repository";
import { hash } from "bcrypt";

export class AuthService{
    private readonly _userModel=new UserRepository(UserModel)
    constructor() { }
    signup = async (req: Request, res: Response, next: NextFunction) => {
        let { firstName, lastName, email, password, confirmPassword, gender, DOB, profilePicture, coverPicture }: SignupRequest = req.body;
        const hashed:string = await hash(password,12)
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }
        const user = await this._userModel.create({ firstName, lastName, email, password:hashed, gender, DOB, profilePicture, coverPicture });
        res.status(201).json({
            message: "User created successfully",
            data: {
                firstName,
                lastName,
                email,
                password:hashed,
                gender,
                DOB
            }
        });
        
    }
    signin = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body
        res.status(200).json({
            message: "User signed in successfully",
            data: {
                email,
                password
            }
        });
     }
}
