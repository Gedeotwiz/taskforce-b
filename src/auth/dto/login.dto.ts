import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';  
 
export class Login {  
    

    @IsNotEmpty({ message: "Please provide your email" })  
    @ApiProperty()   
    email: string;  

    @IsNotEmpty({ message: "Please provide your password" }) 
    @ApiProperty()
     password: string;

    
}