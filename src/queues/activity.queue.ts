import { redis } from '@/lib/redis.js';
import { Queue } from 'bullmq';

export const activityQueue = new Queue('activity-sync', {
  connection: redis,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: 'exponential',
      delay: 3000,
    },

    removeOnComplete: 100,

    removeOnFail: 500,
  },
});
