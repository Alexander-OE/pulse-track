import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async signUp(registerDto: RegisterDto) {
    const { firstName, lastName, email, phone_number, password } = registerDto;

    const userExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone_number,
        password: hashedPassword,
      },
    });

    return {
      message: 'User successfully signed up!',
      user: newUser,
    };
  }

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const userExist = await this.prisma.user.findUnique({ where: { email } });

    if (!userExist) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const isPassowrd = bcrypt.compare(password, userExist.password);
    if (!isPassowrd) {
      throw new HttpException('wrong credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwt.sign({ id: userExist.id, email: email });

    const { password: _, ...withoutPassword } = userExist;

    return { withoutPassword, token };
  }
}
