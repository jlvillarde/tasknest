import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import { AuthProvider } from "src/auth/entity/auth-provider.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true })
    name: string;

    @OneToMany(() => AuthProvider, (AuthProvider) => AuthProvider.user, { cascade: true })
    authProvider: AuthProvider[];

    @CreateDateColumn()
    createdAt: Date
}