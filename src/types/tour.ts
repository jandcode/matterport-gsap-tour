export interface TourStep {
  sweep: string;
  rotation: { x: number; y: number };
  title: string;
  description: string;
}

export interface TourConfig {
  steps: TourStep[];
}
