import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handlers";
import { UsersService } from "../services/user.services";

const userService = new UsersService();

export class UsersController {
  constructor() {}
  async getUser(req: Request, res: Response) {
    try {
    } catch (error) {
      handleHttp(res, "ERROR_GET_USER");
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.findUsers();
      console.log("UsersController: ", users);
      return res.status(200).json(users);
    } catch (error) {
      handleHttp(res, "ERROR_GET_USERS");
    }
  }

  async getUserById({ params }: Request, res: Response) {
    const { id } = params;
    try {
      const user = await userService.findUserById(id);
      const data = user ? user : "NOT_FOUND";
      return res.status(200).json(data);
    } catch (error) {
      handleHttp(res, "ERROR_GET_USER", error);
    }
  }

  async postUser(req: Request, res: Response) {
    const user = req.body;
    try {
      const newUser = await userService.createUser(user);
      return res.status(201).json(newUser);
    } catch (error) {
      handleHttp(res, "ERROR_CREATE_USER", error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
    } catch (error) {
      handleHttp(res, "ERROR_UPDATE_USER");
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
    } catch (error) {
      handleHttp(res, "ERROR_DELETE_USER");
    }
  }
}
