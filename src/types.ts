import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

export interface DamageType {
  1: { score: number; classNames: string[] };
  2: { score: number; classNames: string[] };
  3: { score: number; classNames: string[] };
  4: { score: number; classNames: string[] };
  5: { score: number; classNames: string[] };
}

export interface DamagePointFilter {
  point: number;
  classNames: string[];
}

export type Properties = GeoJsonProperties & {
  CaptureId: string;
  ClassName: string | null;
  DamagePoint: number;
  DetectedAt: number;
  Reviewed: boolean;
  Roadtype: 0 | 1 | 2 | 3;
  RouteId: string;
  Verified: boolean;
};

export interface FeatureWithProperties {
  type: 'Feature';
  geometry: Geometry;
  properties: Properties;
}

export interface FeatureCollectionWithProperties extends FeatureCollection {
  features: FeatureWithProperties[];
}
