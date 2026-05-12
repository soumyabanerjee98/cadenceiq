import 'dotenv/config';
import crypto from 'crypto';

export const verifyStravaSignature = (rawBody: Buffer, signature: string) => {
  const expected = crypto
    .createHmac('sha256', process.env.STRAVA_CLIENT_SECRET!)
    .update(rawBody)
    .digest('hex');

  return expected === signature;
};
