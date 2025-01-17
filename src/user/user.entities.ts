
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'; 
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
} 

@Entity("users")  
export class User {  
    @PrimaryGeneratedColumn()  
    id: string;  
 
    @Column()  
    names: string;  
 
    @Column()  
    email: string;  

    @Column()  
    password: string;

    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.USER,
    })
    role: UserRole;

    @CreateDateColumn()  
    createdAt: Date; 

    @Column({ nullable: true })
   resetPasswordToken: string;

   @Column({ nullable: true })
   resetPasswordExpire: Date;
}