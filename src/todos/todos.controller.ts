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
  ParseIntPipe,
} from '@nestjs/common';
import { ToDosService } from './todos.service';
import { ToDos } from './todos.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

interface AuthenticatedRequest {
  user?: {
    userId: number;
    email: string;
    cid: number;
  };
}

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
@UseGuards(JwtAuthGuard)
export class ToDosController {
  constructor(private readonly todosService: ToDosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Todo created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createToDo(
    @Body() createTodoDto: CreateTodoDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<ToDos> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const companyId = req.user?.cid;
    return this.todosService.createToDo(createTodoDto, userId, companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'List of todos retrieved successfully' })
  async getAllToDos(): Promise<ToDos[]> {
    return this.todosService.getAllToDos();
  }

  @Get('assignee/:userId')
  @ApiOperation({ summary: 'Get todos by assignee' })
  @ApiParam({ name: 'userId', description: 'User ID of the assignee' })
  @ApiResponse({ status: 200, description: 'Todos by assignee retrieved successfully' })
  async getToDosByAssignee(@Param('userId', ParseIntPipe) userId: number): Promise<ToDos[]> {
    return this.todosService.getToDosByAssignee(userId);
  }

  @Get('assigner/:userId')
  @ApiOperation({ summary: 'Get todos by assigner' })
  @ApiParam({ name: 'userId', description: 'User ID of the assigner' })
  @ApiResponse({ status: 200, description: 'Todos by assigner retrieved successfully' })
  async getToDosByAssigner(@Param('userId', ParseIntPipe) userId: number): Promise<ToDos[]> {
    return this.todosService.getToDosByAssigner(userId);
  }

  @Get('bucket/:bucketId')
  @ApiOperation({ summary: 'Get todos by bucket' })
  @ApiParam({ name: 'bucketId', description: 'Bucket ID' })
  @ApiResponse({ status: 200, description: 'Todos by bucket retrieved successfully' })
  async getTodosByBucket(@Param('bucketId', ParseIntPipe) bucketId: number): Promise<ToDos[]> {
    return this.todosService.getTodosByBucket(bucketId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 200, description: 'Todo retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async getToDoById(@Param('id', ParseIntPipe) id: number): Promise<ToDos> {
    return this.todosService.getToDoById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 200, description: 'Todo updated successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async updateToDo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<ToDos> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.todosService.updateToDo(id, updateTodoDto, userId);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update todo status' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['A', 'C', 'P'],
          description: 'Status: A=Active, C=Completed, P=Pending',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Todo status updated successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async updateTodoStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<ToDos> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.todosService.updateTodoStatus(id, status, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 200, description: 'Todo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async deleteToDo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todosService.deleteToDo(id);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file for todo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'No file uploaded' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: any) {
    if (!file) {
      return { success: false, message: 'No file uploaded' };
    }
    return { success: true, filePath: `/uploads/${file.filename}` };
  }
}
