'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Bucket {
  id: string;
  name: string;
  description: string;
  taskCount: number;
}

export default function BucketsPage() {
  const router = useRouter();
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }

    const fetchBuckets = async () => {
      try {
        
        const response = await fetch('', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setBuckets(data);
      } catch (error) {
        console.error('Error fetching buckets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuckets();
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Buckets</h1>
            <button
              onClick={() => router.push('/buckets/add')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add New Bucket
            </button>
          </div>

          {loading ? (
            <div className="text-center py-4">Loading buckets...</div>
          ) : buckets.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No buckets found</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {buckets.map((bucket) => (
                <div
                  key={bucket.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/buckets/${bucket.id}`)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{bucket.name}</h3>
                      <p className="text-gray-600 mt-1">{bucket.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {bucket.taskCount} tasks
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/tasks/add?bucketId=${bucket.id}`);
                        }}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200"
                      >
                        Add Task
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 