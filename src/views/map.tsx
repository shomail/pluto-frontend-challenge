import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DamagePointFilter, FeatureCollectionWithProperties } from '../types';

interface MapViewProps {
  data: FeatureCollectionWithProperties | null;
  roadTypeFilter: number[];
  startDate: number | null;
  endDate: number | null;
  damagePointFilter: DamagePointFilter[];
}

const MapView = ({ data, roadTypeFilter, startDate, endDate, damagePointFilter }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  mapboxgl.accessToken = 'pk.eyJ1IjoiamJlbmRlciIsImEiOiJjanljcDg0dmYwa253M21wYjViemF1OG81In0.Xn79V1SWmWrNGG02ykOpMQ';

  useEffect(() => {
    if (!data) return;
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current as HTMLElement,
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 8,
        center: [12.305519, 55.627262],
      });

      map.current.on('load', function () {
        map.current?.addSource('pluto', {
          type: 'geojson',
          data: data,
        });

        const defaultColor = 'rgb(53, 175, 109)';
        const linearRadiusScale: mapboxgl.Expression = ['interpolate', ['linear'], ['zoom'], 10, 2, 13, 3, 17, 6];
        map.current?.addLayer({
          id: 'captures',
          source: 'pluto',
          type: 'circle',
          paint: {
            'circle-radius': linearRadiusScale,
            'circle-color': [
              'case',
              ['in', '|1|', ['get', 'ClassName']],
              '#FF443B', // Hole
              ['in', '|11|', ['get', 'ClassName']],
              '#FF443B', // Hole
              ['in', '|2|', ['get', 'ClassName']],
              '#FF9A4A', // Crack
              ['in', '|5|', ['get', 'ClassName']],
              '#FF9A4A', // Crack
              ['in', '|7|', ['get', 'ClassName']],
              '#FF9A4A', // Crack
              ['in', '|10|', ['get', 'ClassName']],
              '#FF9A4A', // Crack
              ['in', '|9|', ['get', 'ClassName']],
              '#FF9A4A', // Crocodile crack
              ['in', '|3|', ['get', 'ClassName']],
              '#00FF01', // Depression
              ['in', '|4|', ['get', 'ClassName']],
              '#FFD23D', // Lane marking
              ['in', '|8|', ['get', 'ClassName']],
              '#FFD23D', // Lane marking
              ['in', '|0|', ['get', 'ClassName']],
              '#FFD23D', // Number plate
              ['in', '|6|', ['get', 'ClassName']],
              '#FFD23D', // Face
              defaultColor,
            ],
          },
        });
      });
    }

    return () => map.current?.remove();
  }, [data]);

  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    const filters: unknown[] = ['all'];

    //Roadtype filter

    if (roadTypeFilter.length > 0) {
      filters.push(['in', ['get', 'Roadtype'], ['literal', roadTypeFilter]]);
    }

    // Date filter
    if (startDate !== null && endDate !== null) {
      filters.push(['all', ['>=', ['get', 'DetectedAt'], startDate], ['<=', ['get', 'DetectedAt'], endDate]]);
    }

    // Damage filter

    if (damagePointFilter.length > 0) {
      const classNamesToMatch: string[] = [];

      damagePointFilter.forEach((point) => {
        classNamesToMatch.push(...point.classNames);
      });

      if (classNamesToMatch.length > 0) {
        filters.push(['!', ['in', ['get', 'ClassName'], ['literal', classNamesToMatch]]]);
      }
    }

    map.current.setFilter('captures', filters.length > 1 ? filters : null);
  }, [roadTypeFilter, startDate, endDate, damagePointFilter]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', position: 'absolute' }} />;
};

export default MapView;
