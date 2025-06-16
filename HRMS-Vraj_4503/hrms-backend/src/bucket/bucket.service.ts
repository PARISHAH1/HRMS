import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bucket } from './bucket.entity';

@Injectable()
export class BucketService {
  constructor(
    @InjectRepository(Bucket)
    private bucketRepository: Repository<Bucket>,
  ) {}

  async createBucket(bucket: Partial<Bucket>): Promise<Bucket> {
    const newBucket = this.bucketRepository.create(bucket);
    return this.bucketRepository.save(newBucket);
  }

  async getAllBuckets(): Promise<Bucket[]> {
    return this.bucketRepository.find();
  }
}
