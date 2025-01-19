import { Body, Controller, Post, ConflictException, InternalServerErrorException, BadRequestException, NotFoundException } from "@nestjs/common";  
import { ApiTags } from "@nestjs/swagger";  
import { InjectRepository } from "@nestjs/typeorm";   
import { Repository } from "typeorm";   
import * as bcrypt from 'bcrypt'; 
import { Login } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { User } from "src/user/user.entities";
import { Signup } from "./dto/signup.dto";

interface CreateTaskResponse {  
    message: string;  
    data?: Partial<User>;  
} 

interface LoginResponse {
    message: string;
    token: string;
}

@ApiTags("Authentication")   
@Controller('users')   
export class AccessFile {  
    constructor(  
        @InjectRepository(User)  
        private readonly userRepository: Repository<User>, 
        private readonly authService: AuthService, 
 
    ) {}  

    @Post()
async createUser(@Body() createUserDto: Signup): Promise<CreateTaskResponse> {
    try {
        const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (existingUser) {
            throw new ConflictException('User already exists with this email');
        }


        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const newUser = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        await this.userRepository.save(newUser);
        const { password, ...userWithoutPassword } = newUser;

        return {
            message: 'User created successfully',
            data: userWithoutPassword,
        };
    } catch (error) {
        if (error instanceof ConflictException || error instanceof BadRequestException) {
            throw error;
        } else {
            console.log(error);
            throw new InternalServerErrorException('An error occurred while creating the user');
        }
    }
}

    
    
    @Post('login')
    async loginUser(@Body() loginUserDto: Login): Promise<{ message: string; token: string }> {
        return this.authService.loginUser(loginUserDto);
    }


}