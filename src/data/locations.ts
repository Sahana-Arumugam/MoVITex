export type LocationCategory = 
  | 'academic_room'
  | 'library'
  | 'shuttle_stop'
  | 'outing_gate'
  | 'mess'
  | 'food_spot';

export interface CampusLocation {
  id: string;
  name: string;
  category: LocationCategory;
}

export const campusLocations: CampusLocation[] = [
  // Academic Rooms
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `SMV_Room${i + 1}`,
    name: `SMV Room ${i + 1}`,
    category: 'academic_room' as LocationCategory,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `TT_Room${i + 1}`,
    name: `TT Room ${i + 1}`,
    category: 'academic_room' as LocationCategory,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `GDN_Room${i + 1}`,
    name: `GDN Room ${i + 1}`,
    category: 'academic_room' as LocationCategory,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `MB_Room${i + 1}`,
    name: `MB Room ${i + 1}`,
    category: 'academic_room' as LocationCategory,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `SJT_Room${i + 1}`,
    name: `SJT Room ${i + 1}`,
    category: 'academic_room' as LocationCategory,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `PRP_Room${i + 1}`,
    name: `PRP Room ${i + 1}`,
    category: 'academic_room' as LocationCategory,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `MGB_Room${i + 1}`,
    name: `MGB Room ${i + 1}`,
    category: 'academic_room' as LocationCategory,
  })),

  // Libraries
  { id: 'main_library', name: 'Main Library', category: 'library' },

  // Transport Points
  { id: 'shuttle_main_gate', name: 'Shuttle Stop Main Gate', category: 'shuttle_stop' },
  { id: 'shuttle_sjt', name: 'Shuttle Stop SJT', category: 'shuttle_stop' },

  // Entry / Exit
  { id: 'outing_gate_1', name: 'Outing Gate 1', category: 'outing_gate' },

  // Mess / Dining
  { id: 'mess_d', name: 'Mess D', category: 'mess' },
  { id: 'mess_e', name: 'Mess E', category: 'mess' },
  { id: 'mess_g', name: 'Mess G', category: 'mess' },
  { id: 'mess_h', name: 'Mess H', category: 'mess' },
  { id: 'mess_s', name: 'Mess S', category: 'mess' },
  { id: 'mess_t', name: 'Mess T', category: 'mess' },
  { id: 'mess_p', name: 'Mess P', category: 'mess' },
  { id: 'mess_m', name: 'Mess M', category: 'mess' },

  // Food / Hangout Spots
  { id: 'cafeteria_library_nescafe', name: 'Cafeteria Library Nescafe', category: 'food_spot' },
  { id: 'cafeteria_sjt_nescafe', name: 'Cafeteria SJT Nescafe', category: 'food_spot' },
  { id: 'foodys', name: 'Foodys', category: 'food_spot' },
  { id: 'kc_food_court', name: 'KC Food Court', category: 'food_spot' },
  { id: 'fc_food_court', name: 'FC Food Court', category: 'food_spot' },
];

export const getLocationsByCategory = (category: LocationCategory) => {
  return campusLocations.filter(loc => loc.category === category);
};

export const categories = [
  { id: 'academic_room', label: 'Academic Rooms' },
  { id: 'library', label: 'Libraries' },
  { id: 'shuttle_stop', label: 'Transport Points' },
  { id: 'outing_gate', label: 'Entry / Exit' },
  { id: 'mess', label: 'Mess / Dining' },
  { id: 'food_spot', label: 'Food / Hangout Spots' }
];
