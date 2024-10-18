import './App.css';
import MapView from './views/map';
import Sidebar from './components/Sidebar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/da';
import { useEffect, useState, useMemo } from 'react';
import { DamagePointFilter, FeatureCollectionWithProperties } from './types';

function App() {
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollectionWithProperties | null>(null);

  const [roadTypeFilter, setRoadTypeFilter] = useState<number[]>([]);
  const [damagePointFilter, setDamagePointFilter] = useState<DamagePointFilter[]>([]);

  const handleDamagePointFilterChange = (damagePoint: DamagePointFilter) => {
    const isFilterActive = damagePointFilter.some((point) => point.point === damagePoint.point);
    if (isFilterActive) {
      setDamagePointFilter(damagePointFilter.filter((point) => point.point !== damagePoint.point));
    } else {
      setDamagePointFilter([...damagePointFilter, damagePoint]);
    }
  };

  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);

  const handleRoadTypeFilterChange = (roadType: number) => {
    if (roadTypeFilter.includes(roadType)) {
      setRoadTypeFilter(roadTypeFilter.filter((type) => type !== roadType));
    } else {
      setRoadTypeFilter([...roadTypeFilter, roadType]);
    }
  };

  useEffect(() => {
    const loadGeoJson = async () => {
      const response = await fetch('/test.geojson');
      const data = await response.json();
      setGeoJsonData(data);
    };
    loadGeoJson();
  }, []);

  const points = useMemo(() => {
    if (!geoJsonData) return 0;
    const features = geoJsonData.features;
    const pointsCount: { [key: number]: { score: number; classNames: string[] } } = {
      1: { score: 0, classNames: ['|3|'] },
      2: { score: 0, classNames: [] },
      3: { score: 0, classNames: ['|4|', '|8|', '|0|', '|6|'] },
      4: { score: 0, classNames: ['|2|', '|5|', '|7|', '|10|', '|9|'] },
      5: { score: 0, classNames: ['|1|', '|11|'] },
    };
    let totalFeatures = 0;

    features.forEach((feature) => {
      const className = feature.properties.ClassName;

      if (className === null) {
        return;
      }
      totalFeatures++;
      if (className.includes('|1|') || className.includes('|11|')) {
        pointsCount[5].score++;
      } else if (
        className.includes('|2|') ||
        className.includes('|5|') ||
        className.includes('|7|') ||
        className.includes('|10|') ||
        className.includes('|9|')
      ) {
        pointsCount[4].score++;
      } else if (className.includes('|3|')) {
        pointsCount[1].score++;
      } else if (
        className.includes('|4|') ||
        className.includes('|8|') ||
        className.includes('|0|') ||
        className.includes('|6|')
      ) {
        pointsCount[3].score++;
      } else {
        pointsCount[2].score++;
        if (!pointsCount[2].classNames.includes(className)) {
          pointsCount[2].classNames.push(className);
        }
      }
    });

    const pointsPercentages = {
      1: { score: Math.round((pointsCount[1].score / totalFeatures) * 100), classNames: pointsCount[1].classNames },
      2: { score: Math.round((pointsCount[2].score / totalFeatures) * 100), classNames: pointsCount[2].classNames },
      3: { score: Math.round((pointsCount[3].score / totalFeatures) * 100), classNames: pointsCount[3].classNames },
      4: { score: Math.round((pointsCount[4].score / totalFeatures) * 100), classNames: pointsCount[4].classNames },
      5: { score: Math.round((pointsCount[5].score / totalFeatures) * 100), classNames: pointsCount[5].classNames },
    };

    return pointsPercentages;
  }, [geoJsonData]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="da">
      <div className="App">
        <Sidebar
          points={points}
          roadTypeFilter={roadTypeFilter}
          handleRoadTypeFilterChange={handleRoadTypeFilterChange}
          handleStartDateChange={setStartDate}
          handleEndDateChange={setEndDate}
          startDate={startDate || 0}
          endDate={endDate || 0}
          handleDamagePointFilterChange={handleDamagePointFilterChange}
        />
        <MapView
          data={geoJsonData}
          roadTypeFilter={roadTypeFilter}
          startDate={startDate}
          endDate={endDate}
          damagePointFilter={damagePointFilter}
        />
      </div>
    </LocalizationProvider>
  );
}

export default App;
