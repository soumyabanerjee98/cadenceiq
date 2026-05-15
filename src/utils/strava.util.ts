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

export const distributeLoad = (totalLoad: number) => {
  return {
    easy: totalLoad * 0.8,
    hard: totalLoad * 0.2,
  };
};

export const calculateTargetLoad = (
  currentLoad: number,
  level: ExperienceLevel,
) => {
  const progression = progressionRate[level] || 0.06;

  return Number((currentLoad * (1 + progression)).toFixed(2));
};

export const calculateAdjustedLoad = (targetLoad: number, tsb: number) => {
  let factor = 1;

  /*
    TSB Interpretation

    > 10      = very fresh
    0 to 10   = ready
    -10 to 0  = manageable fatigue
    -20 to -10 = high fatigue
    < -20     = excessive fatigue
  */

  if (tsb < -20) {
    factor = 0.75;
  } else if (tsb < -10) {
    factor = 0.85;
  } else if (tsb < 0) {
    factor = 0.95;
  } else if (tsb > 10) {
    factor = 1.03;
  }

  return Number((targetLoad * factor).toFixed(2));
};

export const deriveTrainingState = ({
  currentLoad,

  atl,

  ctl,

  tsb,

  experienceLevel,
}: {
  currentLoad: number;

  atl: number;

  ctl: number;

  tsb?: number;

  experienceLevel: ExperienceLevel;
}): TrainingState => {
  // fallback derivation
  const readiness = tsb ?? Number((ctl - atl).toFixed(2));

  const targetLoad = calculateTargetLoad(currentLoad, experienceLevel);

  const adjustedLoad = calculateAdjustedLoad(targetLoad, readiness);

  return {
    currentLoad: Number(currentLoad.toFixed(2)),

    targetLoad,

    adjustedLoad,

    fatigue: Number(atl.toFixed(2)),

    fitness: Number(ctl.toFixed(2)),

    readiness: Number(readiness.toFixed(2)),
  };
};
