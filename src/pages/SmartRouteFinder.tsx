import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, Users, Zap, ArrowRight, Info } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';

const locations = [
  'Main Library',
  'SMV Block',
  'GDN Block',
  'MB Block',
  'SJT Block',
  'PRP Block',
  'MGB Block',
  'Mess D',
  'Mess G',
  'Mess S',
  'Shuttle Stop Main Gate',
  'Shuttle Stop SJT',
  'Technology Tower'
];
export const SmartRouteFinder: React.FC = () => {

  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [calculating, setCalculating] = useState(false);

  const [route, setRoute] = useState<null | {
    fastest: { time: string; crowd: string; distance: string };
    quietest: { time: string; crowd: string; distance: string };
  }>(null);


  const handleFindRoute = async () => {

  if (!start || !destination) return;

  setCalculating(true);

  try {

    const fastest = await fetch("http://127.0.0.1:8000/predict-route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_location: start,
        destination_location: destination,
        distance_meters: 350,
        path_capacity: 300,
        path_people_count: 180,
        path_crowd_density: "high"
      })
    });

    const quietest = await fetch("http://127.0.0.1:8000/predict-route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_location: start,
        destination_location: destination,
        distance_meters: 520,
        path_capacity: 300,
        path_people_count: 60,
        path_crowd_density: "low"
      })
    });

    const fastestData = await fastest.json();
    const quietestData = await quietest.json();

    setRoute({
      fastest: {
        time: `${fastestData.shortest_route_time.toFixed(1)} mins`,
        crowd: "High",
        distance: "350m"
      },
      quietest: {
        time: `${quietestData.shortest_route_time.toFixed(1)} mins`,
        crowd: "Low",
        distance: "520m"
      }
    });

  } catch (err) {
    console.error(err);
  }

  setCalculating(false);
};


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 max-w-4xl mx-auto"
    >

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">
          Smart <span className="text-emerald-500">Route Finder</span>
        </h1>
        <p className="text-white/40 text-sm">
          Find the most efficient way to navigate campus based on live crowd data.
        </p>
      </div>


      <GlassPanel className="p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="space-y-2">

            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">
              Starting Point
            </label>

            <div className="relative">

              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />

              <select 
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all appearance-none"
              >

                <option value="" disabled>Select location</option>

                {locations.map(loc =>
                  <option key={loc} value={loc} className="bg-[#0a0a0a]">
                    {loc}
                  </option>
                )}

              </select>

            </div>

          </div>


          <div className="space-y-2">

            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">
              Destination
            </label>

            <div className="relative">

              <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />

              <select 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all appearance-none"
              >

                <option value="" disabled>Select destination</option>

                {locations.map(loc =>
                  <option key={loc} value={loc} className="bg-[#0a0a0a]">
                    {loc}
                  </option>
                )}

              </select>

            </div>

          </div>

        </div>


        <button 
          onClick={handleFindRoute}
          disabled={!start || !destination || calculating}
          className="w-full py-4 rounded-xl bg-emerald-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >

          {calculating ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Calculating Routes...
            </>
          ) : (
            <>
              Find Best Route
              <ArrowRight className="w-4 h-4" />
            </>
          )}

        </button>

      </GlassPanel>


      {route && !calculating && (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>

            <GlassPanel className="p-6 border-emerald-500/20 bg-emerald-500/5">

              <div className="flex items-center justify-between mb-6">

                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                  Fastest Option
                </div>

                <Clock className="w-5 h-5 text-emerald-500" />

              </div>


              <div className="space-y-4">

                <div className="flex justify-between items-end">

                  <span className="text-4xl font-display font-bold text-white">
                    {route.fastest.time}
                  </span>

                  <span className="text-white/40 text-xs mb-1">
                    {route.fastest.distance}
                  </span>

                </div>


                <div className="flex items-center gap-2 text-xs text-white/60">

                  <Users className="w-4 h-4 text-red-400" />

                  <span>
                    Crowd Density:
                    <span className="text-red-400 font-bold">
                      {" "}{route.fastest.crowd}
                    </span>
                  </span>

                </div>

              </div>

            </GlassPanel>

          </motion.div>


          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>

            <GlassPanel className="p-6 border-blue-500/20 bg-blue-500/5">

              <div className="flex items-center justify-between mb-6">

                <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest">
                  Quietest Option
                </div>

                <Zap className="w-5 h-5 text-blue-500" />

              </div>


              <div className="space-y-4">

                <div className="flex justify-between items-end">

                  <span className="text-4xl font-display font-bold text-white">
                    {route.quietest.time}
                  </span>

                  <span className="text-white/40 text-xs mb-1">
                    {route.quietest.distance}
                  </span>

                </div>


                <div className="flex items-center gap-2 text-xs text-white/60">

                  <Users className="w-4 h-4 text-emerald-400" />

                  <span>
                    Crowd Density:
                    <span className="text-emerald-400 font-bold">
                      {" "}{route.quietest.crowd}
                    </span>
                  </span>

                </div>

              </div>

            </GlassPanel>

          </motion.div>

        </div>

      )}


      <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex gap-4 items-start">

        <div className="p-2 rounded-lg bg-blue-500/10">
          <Info className="w-4 h-4 text-blue-500" />
        </div>

        <p className="text-xs text-white/40 leading-relaxed">
          Routes are calculated using AI-powered predictions from real campus crowd data.
        </p>

      </div>

    </motion.div>
  );
};