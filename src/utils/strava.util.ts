import {
  getHRZones,
  intensityFactor,
  progressionRate,
} from '@/config/strava.config.js';

export const classifyIntensity = (avgHR: number, maxHR: number) => {
  const zones = getHRZones(maxHR);

  for (const [zone, [min, max]] of Object.entries(zones)) {
    if (avgHR >= min! && avgHR <= max!) return zone;
  }

  return 'unknown';
};

export const calculateTrainingLoad = (
  duration: number, // seconds
  zone: string,
) => {
  const factor: number =
    intensityFactor[zone as keyof typeof intensityFactor] || 1;
  return (duration / 60) * factor; // minutes * factor
};

export const getTargetWeeklyLoad = (currentLoad: number, level: string) => {
  return (
    currentLoad * (1 + progressionRate[level as keyof typeof progressionRate])
  );
};

export const adjustForFatigue = (targetLoad: number, tsb: number) => {
  if (tsb < -25) {
    // very fatigued
    return targetLoad * 0.6;
  }

  if (tsb < -15) {
    // fatigued
    return targetLoad * 0.75;
  }

  if (tsb < -5) {
    // slight fatigue
    return targetLoad * 0.9;
  }

  if (tsb >= -5 && tsb <= 10) {
    // optimal zone
    return targetLoad;
  }

  if (tsb > 10 && tsb <= 20) {
    // fresh → can push
    return targetLoad * 1.1;
  }

  if (tsb > 20) {
    // too fresh → undertraining
    return targetLoad * 1.25;
  }

  return targetLoad;
};

export const distributeLoad = (totalLoad: number) => {
  return {
    easy: totalLoad * 0.8,
    hard: totalLoad * 0.2,
  };
};

export const generateWeeklyPlan = (totalLoad: number): Plan[] => {
  const { easy, hard } = distributeLoad(totalLoad);

  return [
    { day: 'Mon', type: 'rest', load: 0 },

    { day: 'Tue', type: 'hard', load: hard * 0.4 },
    { day: 'Wed', type: 'easy', load: easy * 0.2 },

    { day: 'Thu', type: 'hard', load: hard * 0.4 },
    { day: 'Fri', type: 'easy', load: easy * 0.2 },

    { day: 'Sat', type: 'long', load: easy * 0.4 },
    { day: 'Sun', type: 'recovery', load: easy * 0.2 },
  ];
};

export const estimateLoadFromDistance = (distanceKm: number) => {
  // rough heuristic: 1km ≈ 5 load units
  return distanceKm * 5;
};

export const getWeeksRemaining = (eventDate: Date) => {
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  return Math.max(1, Math.ceil(diff / (7 * 24 * 60 * 60 * 1000)));
};
