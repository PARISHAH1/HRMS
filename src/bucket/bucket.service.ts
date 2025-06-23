import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.bucketRepository.find({
      relations: ['company', 'createdBy', 'updatedBy'],
    });
  }

  async getBucketById(id: number): Promise<Bucket> {
    const bucket = await this.bucketRepository.findOne({
      where: { BucketId: id },
      relations: ['company', 'createdBy', 'updatedBy'],
    });
    
    if (!bucket) {
      throw new NotFoundException(`Bucket with ID ${id} not found`);
    }
    return bucket;
  }

  async updateBucket(id: number, bucketData: Partial<Bucket>): Promise<Bucket> {
    const bucket = await this.getBucketById(id);
    Object.assign(bucket, bucketData);
    return this.bucketRepository.save(bucket);
  }

  async deleteBucket(id: number): Promise<void> {
    const result = await this.bucketRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bucket with ID ${id} not found`);
    }
  }
}
