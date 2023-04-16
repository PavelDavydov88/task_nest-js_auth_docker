import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreateProfileDto } from "./dto/create-profile.dto";

@Controller('auth')
export class UserController {

  constructor(
    private userService : UserService,) {}

  @Get()
  hello(){
    return 'Hello from auth'
  }

  @MessagePattern('create-user')
  async createUserData(dto: CreateProfileDto) {
    const res = await this.userService.creatUser(dto);
    console.log(res);
    return res;
  }

  @MessagePattern('delete-user')
  async deleteUser(id : number) {
    const res = await this.userService.deleteUser(id);
    return res;
  }

  @MessagePattern('validate-user')
  async validateUser(dto: CreateProfileDto) {
    const res = await this.userService.validateUser(dto);
    console.log(res);
    return res;
  }
}