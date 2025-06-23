import { Controller, Post, Get, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { Bucket } from './bucket.entity';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam 
} from '@nestjs/swagger';

@ApiTags('buckets')
@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bucket' })
  @ApiResponse({ status: 201, description: 'Bucket created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createBucket(@Body() bucket: Partial<Bucket>): Promise<Bucket> {
    return this.bucketService.createBucket(bucket);
  }

  @Get()
  @ApiOperation({ summary: 'Get all buckets' })
  @ApiResponse({ status: 200, description: 'List of buckets retrieved successfully' })
  async getAllBuckets(): Promise<Bucket[]> {
    return this.bucketService.getAllBuckets();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bucket by ID' })
  @ApiParam({ name: 'id', description: 'Bucket ID' })
  @ApiResponse({ status: 200, description: 'Bucket retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Bucket not found' })
  async getBucketById(@Param('id', ParseIntPipe) id: number): Promise<Bucket> {
    return this.bucketService.getBucketById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update bucket by ID' })
  @ApiParam({ name: 'id', description: 'Bucket ID' })
  @ApiResponse({ status: 200, description: 'Bucket updated successfully' })
  @ApiResponse({ status: 404, description: 'Bucket not found' })
  async updateBucket(@Param('id', ParseIntPipe) id: number, @Body() bucket: Partial<Bucket>): Promise<Bucket> {
    return this.bucketService.updateBucket(id, bucket);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete bucket by ID' })
  @ApiParam({ name: 'id', description: 'Bucket ID' })
  @ApiResponse({ status: 200, description: 'Bucket deleted successfully' })
  @ApiResponse({ status: 404, description: 'Bucket not found' })
  async deleteBucket(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bucketService.deleteBucket(id);
  }
}
