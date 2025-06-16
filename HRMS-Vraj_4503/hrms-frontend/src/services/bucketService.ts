import axios from 'axios';

const API_URL = 'http://localhost:5000/Bucket'; 

export interface Bucket {
  BucketId?: number;
  CID?: number;
  BucketName: string;
  BucketDescription?: string;
  created?: Date;
  updated?: Date;
  CreatedBy?: number;
  UpdatedBy?: number;
}

export const createBucket = async (bucket: Partial<Bucket>): Promise<Bucket> => {
  const response = await axios.post<Bucket>(API_URL, bucket);
  return response.data;
};

export const getAllBuckets = async (): Promise<Bucket[]> => {
  const response = await axios.get<Bucket[]>(API_URL);
  return response.data;
};
