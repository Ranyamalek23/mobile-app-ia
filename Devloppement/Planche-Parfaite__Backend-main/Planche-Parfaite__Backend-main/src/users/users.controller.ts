import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users') // Groupes dans Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  @ApiBody({ type: CreateUserDto }) // Swagger pour le Request Body
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiBody({ type: UpdateUserDto }) // Swagger pour le Request Body
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
