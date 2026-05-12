import { prisma } from '@/lib/prisma.js';
import axios from 'axios';
import 'dotenv/config';

export const connectStrava = ({ userId }: { userId: string }) => {
  const state = Buffer.from(JSON.stringify({ userId })).toString('base64');
  const url =
    `https://www.strava.com/oauth/authorize` +
    `?client_id=${process.env.STRAVA_CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${process.env.STRAVA_REDIRECT_URI}` +
    `&scope=activity:read_all` +
    `&state=${state}`;

  return url;
};

export const stravaCallback = async ({
  code,
  userId,
}: {
  code: string;
  userId: string;
}) => {
  const response = await axios.post('https://www.strava.com/oauth/token', {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
  });

  const data = response.data;

  const update = await prisma.stravaToken.upsert({
    where: { userId },
    update: {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at,
      athleteId: data.athlete.id,
    },
    create: {
      userId,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at,
      athleteId: data.athlete.id,
    },
  });

  return { update };
};
