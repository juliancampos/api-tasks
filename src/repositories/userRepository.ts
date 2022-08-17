import { AppDataSource } from "@src/data-source";
import { User } from "@src/entities/User";

export const userRepository = AppDataSource.getRepository(User);
