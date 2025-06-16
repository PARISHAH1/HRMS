import { Controller, Post, Get, Body } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { Bucket } from './bucket.entity';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post()
  async createBucket(@Body() bucket: Partial<Bucket>): Promise<Bucket> {
    return this.bucketService.createBucket(bucket);
  }

  @Get()
  async getAllBuckets(): Promise<Bucket[]> {
    return this.bucketService.getAllBuckets();
  }
}
