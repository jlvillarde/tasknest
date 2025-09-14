import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { AuthProvider } from '../entity/auth-provider.entity';
import bcrypt from 'bcrypt';
import { Provider } from '../enums/provider.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(AuthProvider)
        private readonly authProviderRepo: Repository<AuthProvider>
    ) { }

    async signupLocal(email: string, password: string, name: string) {
        // Check if user exist
        const existingUser = await this.userRepo.findOne({ where: { email: email } });

        if (existingUser) {
            throw new ConflictException('Email already exist');
        }

        // save in users table
        const user = this.userRepo.create({ email, name });
        await this.userRepo.save(user);

        // save local provider details
        const hashedPassword = await bcrypt.hash(password, 10)
        const authProvider = await this.authProviderRepo.create({
            user: user,
            provider: Provider.LOCAL,
            password: hashedPassword
        });
        await this.authProviderRepo.save(authProvider);

        return user;
    }


}
