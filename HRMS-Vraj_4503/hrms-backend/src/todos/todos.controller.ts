import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ToDosService } from './todos.service';
import { ToDos } from './todos.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

interface AuthenticatedRequest {
  user?: {
    userId: number;
    email: string;
  };
  headers?: {
    authorization?: string;
  };
}

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class ToDosController {
  constructor(private readonly todosService: ToDosService) {}

  @Post()
  async createToDo(
    @Body() todo: Partial<ToDos>,
    @Request() req: AuthenticatedRequest,
  ): Promise<ToDos> {
    // Auto-generate AssgnBy/CreatedBy from authenticated user
    const userId = req.user?.userId;
    if (userId) {
      todo.CreatedBy = userId;
      todo.UpdatedBy = userId;
      // If AssgnBy is not provided, set it to current user
      if (!todo.AssgnBy) {
        todo.AssgnBy = userId;
      }
    }
    return this.todosService.createToDo(todo);
  }

  @Get()
  async getAllToDos(@Request() req: AuthenticatedRequest): Promise<ToDos[]> {
    // Debug: log the Authorization header and user object
    console.log('Authorization header:', req.headers?.authorization);
    console.log('User object:', req.user);
    return this.todosService.getAllToDos();
  }

  @Get('assignee/:userId')
  async getToDosByAssignee(@Param('userId') userId: string): Promise<ToDos[]> {
    return this.todosService.getToDosByAssignee(+userId);
  }

  @Get('assigner/:userId')
  async getToDosByAssigner(@Param('userId') userId: string): Promise<ToDos[]> {
    return this.todosService.getToDosByAssigner(+userId);
  }

  @Get(':id')
  async getToDoById(@Param('id') id: string): Promise<ToDos> {
    return this.todosService.getToDoById(+id);
  }

  @Put(':id')
  async updateToDo(
    @Param('id') id: string,
    @Body() todo: Partial<ToDos>,
    @Request() req: AuthenticatedRequest,
  ): Promise<ToDos> {
    // Auto-generate UpdatedBy from authenticated user
    const userId = req.user?.userId;
    if (userId) {
      todo.UpdatedBy = userId;
    }
    return this.todosService.updateToDo(+id, todo);
  }

  @Delete(':id')
  async deleteToDo(@Param('id') id: string): Promise<void> {
    return this.todosService.deleteToDo(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { success: false, message: 'No file uploaded' };
    }
    // Return the relative file path for storage in DB
    return { success: true, filePath: `/uploads/${file.filename}` };
  }
}
