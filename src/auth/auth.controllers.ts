import { Request, Response } from "express";
import { throwError } from "../utils/error.handlers";
import { UsersService } from "../services/user.services";
import { TokensServices } from "../services/token.services";
import { AuthService } from "./auth.services";
import exclude from "../utils/exclude";

const userService = new UsersService();
const authService = new AuthService();
const tokenService = new TokensServices();

export class AuthController {
  constructor() {}

  async register(req: Request, res: Response) {
    const user = req.body;
    try {
      const newUser = await userService.createUser(user);
      const userWithoutPassword = exclude(newUser, [
        "is_active",
        "password",
        "created_at",
        "updated_at",
      ]);
      const tokens = await tokenService.generateAuthTokens(newUser);
      res.status(201).json({ user: userWithoutPassword, tokens });
    } catch (error) {
      throwError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await authService.loginWithEmailAndPassword(email, password);
      const tokens = await tokenService.generateAuthTokens(user);
      res.status(200).json({ user, tokens });
    } catch (error) {
      throwError(res, error);
    }
  }
}
