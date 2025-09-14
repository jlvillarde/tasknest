import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignupDto } from '../dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signupLocal(@Body() signupDto: SignupDto) {
    try {

      const { email, password, name } = signupDto;
      const user = await this.authService.signupLocal(email, password, name);

      return {
        message: 'User created successfully',
        userId: user.id,
        email: user.email,
      };

    } catch (error) {

    }
  }

}
