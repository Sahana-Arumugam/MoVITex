import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCrowdSimulation } from '../../hooks/useCrowdSimulation';
import { AlertCircle, Map as MapIcon, RefreshCw } from 'lucide-react';
import { RouteResult } from '../../services/routingService';

// Use the token from environment or a public example token for demo purposes
const MAPBOX_TOKEN = process.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMDBuazQzbXpjZ3p6YnZ0biJ9';
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapComponentProps {
  activeRoute?: RouteResult | null;
}

export const MapComponent: React.FC<MapComponentProps> = ({ activeRoute }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use the new simulation engine
  const { buildings, heatmap } = useCrowdSimulation(5000);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  // Initialize Map
  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-122.4200, 37.7750],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        antialias: true
      });

      map.current.on('error', (e) => {
        if (e.error?.message?.toLowerCase().includes('token') || e.error?.status === 401) {
          setMapError('A valid Mapbox Access Token is required to view the live map.');
        }
      });

      map.current.on('load', () => {
        if (!map.current) return;
        setIsLoaded(true);

        // Add Heatmap Source
        map.current.addSource('crowd-heatmap', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] }
        });

        // Add Route Source
        map.current.addSource('route-line', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] }
        });

        map.current.addLayer({
          id: 'crowd-heat',
          type: 'heatmap',
          source: 'crowd-heatmap',
          maxzoom: 18,
          paint: {
            'heatmap-weight': ['get', 'intensity'],
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 18, 3],
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(16, 185, 129, 0)',
              0.2, 'rgba(16, 185, 129, 0.5)',
              0.4, 'rgba(245, 158, 11, 0.7)',
              0.7, 'rgba(239, 68, 68, 0.8)',
              1, 'rgba(239, 68, 68, 1)'
            ],
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 18, 20],
            'heatmap-opacity': 0.6
          }
        });

        // Add Route Layer
        map.current.addLayer({
          id: 'route-line-layer',
          type: 'line',
          source: 'route-line',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': ['get', 'color'],
            'line-width': 6,
            'line-opacity': 0.8,
            'line-dasharray': [1, 1]
          }
        });

        map.current.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#222',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.8
          }
        });
      });
    } catch (e) {
      setMapError('Failed to initialize map component.');
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  // Sync Simulation Data to Map
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    // 1. Update Heatmap
    const source = map.current.getSource('crowd-heatmap') as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: heatmap.map(point => ({
          type: 'Feature',
          properties: { intensity: point.intensity },
          geometry: { type: 'Point', coordinates: point.coords }
        }))
      });
    }

    // 2. Update Markers
    buildings.forEach((building) => {
      let marker = markersRef.current[building.id];
      const color = building.status === 'optimal' ? '#10b981' : 
                    building.status === 'warning' ? '#f59e0b' : '#ef4444';
      const occupancyRatio = (building.occupancy / building.capacity) * 100;

      if (!marker) {
        const el = document.createElement('div');
        el.className = 'group relative w-4 h-4 rounded-full border border-white/50 cursor-pointer transition-all duration-300 hover:scale-150';
        
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block glass-panel p-2 min-w-[120px] z-50 pointer-events-none border-white/20';
        el.appendChild(tooltip);

        marker = new mapboxgl.Marker(el)
          .setLngLat(building.coordinates)
          .addTo(map.current!);
        
        markersRef.current[building.id] = marker;
      }

      // Update marker appearance
      const el = marker.getElement();
      el.style.backgroundColor = color;
      el.style.boxShadow = `0 0 10px ${color}`;
      
      const tooltip = el.querySelector('.glass-panel');
      if (tooltip) {
        tooltip.innerHTML = `
          <p class="text-[10px] font-bold uppercase text-white/40 tracking-wider">${building.name}</p>
          <div class="flex items-center justify-between mt-1">
            <span class="text-xs font-medium">Crowd Level</span>
            <span class="text-xs font-bold ${building.status === 'critical' ? 'text-red-400' : 'text-emerald-400'}">
              ${Math.round(occupancyRatio)}%
            </span>
          </div>
          <div class="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
            <div class="h-full bg-current rounded-full" style="width: ${occupancyRatio}%; color: ${color}"></div>
          </div>
        `;
      }
    });
  }, [buildings, heatmap, isLoaded]);

  // Sync Route Data to Map
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    const source = map.current.getSource('route-line') as mapboxgl.GeoJSONSource;
    if (!source) return;

    if (!activeRoute) {
      source.setData({ type: 'FeatureCollection', features: [] });
      return;
    }

    const coordinates = activeRoute.path.map(id => {
      const b = buildings.find(building => building.id === id);
      return b ? b.coordinates : null;
    }).filter(c => c !== null) as [number, number][];

    source.setData({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {
          color: activeRoute.type === 'fastest' ? '#3b82f6' : '#10b981'
        },
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      }]
    });

    // Fit map to route
    if (coordinates.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      coordinates.forEach(c => bounds.extend(c));
      map.current.fitBounds(bounds, { padding: 100, duration: 1000 });
    }
  }, [activeRoute, isLoaded]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Error Overlay */}
      {mapError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-8 text-center">
          <div className="max-w-md flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-display font-bold">Map Configuration Required</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              {mapError}
              <br />
              Please provide a valid token in the environment settings.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {!isLoaded && !mapError && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0a0a0a]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">Initializing Digital Twin...</p>
          </div>
        </div>
      )}

      {/* Map Controls Overlay */}
      {isLoaded && (
        <>
          <div className="absolute top-6 left-6 flex flex-col gap-3">
            <div className="glass-panel py-2 px-4 flex items-center gap-3 border-emerald-500/20">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">Live Crowd Feed</span>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 glass-panel p-4 flex flex-col gap-3 min-w-[160px]">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Density Index</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/60">High</span>
                <div className="w-24 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500" />
                <span className="text-[10px] text-white/60 ml-2">Low</span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-white/60 uppercase">Optimal Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[10px] text-white/60 uppercase">Congestion</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
