import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { CreateProfileDto } from "./dto/create-profile.dto";

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private userRepository: typeof User,
  ) {
  }

  async creatUser(dto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({ where: { "login": dto.login } });
    if (candidate) {
      console.log("This login already exist");
      return null;
    }
    ;
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userRepository.create({ ...dto, password: hashPassword });
    return user.id;
  }

  async deleteUser(id: number) {
    const candidate = await this.userRepository.findOne({ where: { "id": id } });
    if (candidate) {
      await this.userRepository.destroy({ where: { "id": id } });
      return candidate;
    }
    console.log("This Id is not exist");
    return null;
  }

  async validateUser(dto: CreateProfileDto) {
    const user = await this.userRepository.findOne({ where: { "login": dto.login } });
    if (!user) {
      console.log("Invalid login");
      return null;
    }
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user.id;
    }
    console.log("Invalid password");
    return null;
  }

}
