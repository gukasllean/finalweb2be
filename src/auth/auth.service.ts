import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(email: string, password: string) {
    const user: User | null = await this.userService.findByEmail(email);
    if (
      user == null ||
      email != user.email ||
      !bcrypt.compareSync(password, user?.password_hash)
    ) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayloadDto = { sub: user.id, email: user.email, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDTO) {
    const existedUser: User | null =
      await this.userService.findByEmailOrUsername(
        registerDto.email,
        registerDto.username,
      );
    if (existedUser) {
      throw new HttpException(
        'Email or username already exists',
        HttpStatus.CONFLICT,
      );
    }
    
    // Create a new user with a default profile picture
    const user: User = new User();
    user.email = registerDto.email;
    user.username = registerDto.username;
    user.password_hash = bcrypt.hashSync(registerDto.password, 10);
    
    // Add default profile picture to satisfy the NOT NULL constraint
    user.profile_picture = 'https://images.steamusercontent.com/ugc/2488879640014613454/D300EC67B5FB6FC5A7ECBAEC48F29B370144ED22/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false';
    
    // You could also use a more generic default avatar like:
    // user.profile_picture = `https://ui-avatars.com/api/?name=${registerDto.username}&background=random`;
    
    await this.userService.save(user);
  }
}