import { Controller, Get, Post } from "@overnightjs/core";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Request, Response } from "express";


@Controller('api/users')
export class UserController {
  userRepository = AppDataSource.getRepository(User);
  constructor() {}

  @Get('')
  public async getUser(req: Request, res: Response): Promise<void> {
    const users = await this.userRepository.find();
    res.send(users);
  }

  @Post('')
  public async postUser(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    try {
      const user: { name: string } = this.userRepository.create({ name });
      await this.userRepository.save(user);
      console.log(user);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).send(error);      
    }
  }
}