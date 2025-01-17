import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator';  

 
export class Signup {  
    
    @IsNotEmpty({ message: "Please provide your last name" })  
    @IsString()
    @ApiProperty()   
    names: string;  

    @IsNotEmpty({ message: "Please provide your email" })  
    @IsEmail({}, { message: "Email must be valid" }) 
    @ApiProperty()   
    email: string;  

    @IsNotEmpty({ message: "Please provide your password" }) 
    @ApiProperty()
    @IsStrongPassword({minLength:8,minNumbers:3,minUppercase:1,minSymbols:1},
        {message:"Please password must be strong password containing uppercase,lowercase, number and special characters"})  
    password: string;

    @IsNotEmpty({ message: "Please provide password and confrim password not match" }) 
    @ApiProperty() 
    confrimpassword: string;
  
}