import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { Provider } from "../enums/provider.enum";

@Entity('auth_providers')
export class AuthProvider {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.authProvider, { onDelete: 'CASCADE' })
    user: User;

    @Column({ nullable: true })
    providerUserId: string;

    @Column({ type: 'enum', enum: Provider })
    provider: Provider;

    @Column({ nullable: true })
    password: string;

    @CreateDateColumn()
    createdAt: Date;
}