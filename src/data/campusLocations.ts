import { Building, LocationCategory } from '../types';

/**
 * VIT Campus Locations Database
 * Organized by category and block for smart filtering
 * Block field only applies to academic rooms
 */

// Helper function to generate realistic capacity and current occupancy
const generateLocationData = (
  capacity: number,
  baseOccupancy: number = 0
): { occupancy: number; capacity: number; energyUsage: number; efficiency: number } => {
  const occupancy = Math.floor(baseOccupancy + Math.random() * (capacity * 0.3));
  const efficiency = 70 + Math.random() * 25;
  const energyUsage = (capacity / 100) * (occupancy / capacity) * (100 - efficiency);

  return {
    occupancy,
    capacity,
    energyUsage: Math.round(energyUsage * 10) / 10,
    efficiency: Math.round(efficiency),
  };
};

// Academic Rooms organized by block
const createAcademicRoom = (
  id: string,
  name: string,
  block: string,
  coordinates: [number, number],
  capacity: number = 60
): Building => ({
  id,
  name,
  block,
  category: 'academic_room',
  coordinates,
  status: 'optimal',
  ...generateLocationData(capacity, capacity * 0.4),
});

// SMV Block Rooms (10 rooms)
const smvRooms: Building[] = [
  createAcademicRoom('smv_r1', 'SMV_Room1', 'SMV', [12.8394, 79.1323], 60),
  createAcademicRoom('smv_r2', 'SMV_Room2', 'SMV', [12.8395, 79.1324], 60),
  createAcademicRoom('smv_r3', 'SMV_Room3', 'SMV', [12.8396, 79.1325], 60),
  createAcademicRoom('smv_r4', 'SMV_Room4', 'SMV', [12.8397, 79.1326], 60),
  createAcademicRoom('smv_r5', 'SMV_Room5', 'SMV', [12.8398, 79.1327], 60),
  createAcademicRoom('smv_r6', 'SMV_Room6', 'SMV', [12.8394, 79.1328], 60),
  createAcademicRoom('smv_r7', 'SMV_Room7', 'SMV', [12.8395, 79.1329], 60),
  createAcademicRoom('smv_r8', 'SMV_Room8', 'SMV', [12.8396, 79.1330], 60),
  createAcademicRoom('smv_r9', 'SMV_Room9', 'SMV', [12.8397, 79.1331], 60),
  createAcademicRoom('smv_r10', 'SMV_Room10', 'SMV', [12.8398, 79.1332], 60),
];

// TT Block Rooms (10 rooms)
const ttRooms: Building[] = [
  createAcademicRoom('tt_r1', 'TT_Room1', 'TT', [12.8410, 79.1340], 60),
  createAcademicRoom('tt_r2', 'TT_Room2', 'TT', [12.8411, 79.1341], 60),
  createAcademicRoom('tt_r3', 'TT_Room3', 'TT', [12.8412, 79.1342], 60),
  createAcademicRoom('tt_r4', 'TT_Room4', 'TT', [12.8413, 79.1343], 60),
  createAcademicRoom('tt_r5', 'TT_Room5', 'TT', [12.8414, 79.1344], 60),
  createAcademicRoom('tt_r6', 'TT_Room6', 'TT', [12.8410, 79.1345], 60),
  createAcademicRoom('tt_r7', 'TT_Room7', 'TT', [12.8411, 79.1346], 60),
  createAcademicRoom('tt_r8', 'TT_Room8', 'TT', [12.8412, 79.1347], 60),
  createAcademicRoom('tt_r9', 'TT_Room9', 'TT', [12.8413, 79.1348], 60),
  createAcademicRoom('tt_r10', 'TT_Room10', 'TT', [12.8414, 79.1349], 60),
];

// GDN Block Rooms (10 rooms)
const gdnRooms: Building[] = [
  createAcademicRoom('gdn_r1', 'GDN_Room1', 'GDN', [12.8420, 79.1350], 60),
  createAcademicRoom('gdn_r2', 'GDN_Room2', 'GDN', [12.8421, 79.1351], 60),
  createAcademicRoom('gdn_r3', 'GDN_Room3', 'GDN', [12.8422, 79.1352], 60),
  createAcademicRoom('gdn_r4', 'GDN_Room4', 'GDN', [12.8423, 79.1353], 60),
  createAcademicRoom('gdn_r5', 'GDN_Room5', 'GDN', [12.8424, 79.1354], 60),
  createAcademicRoom('gdn_r6', 'GDN_Room6', 'GDN', [12.8420, 79.1355], 60),
  createAcademicRoom('gdn_r7', 'GDN_Room7', 'GDN', [12.8421, 79.1356], 60),
  createAcademicRoom('gdn_r8', 'GDN_Room8', 'GDN', [12.8422, 79.1357], 60),
  createAcademicRoom('gdn_r9', 'GDN_Room9', 'GDN', [12.8423, 79.1358], 60),
  createAcademicRoom('gdn_r10', 'GDN_Room10', 'GDN', [12.8424, 79.1359], 60),
];

// MB Block Rooms (10 rooms)
const mbRooms: Building[] = [
  createAcademicRoom('mb_r1', 'MB_Room1', 'MB', [12.8430, 79.1360], 60),
  createAcademicRoom('mb_r2', 'MB_Room2', 'MB', [12.8431, 79.1361], 60),
  createAcademicRoom('mb_r3', 'MB_Room3', 'MB', [12.8432, 79.1362], 60),
  createAcademicRoom('mb_r4', 'MB_Room4', 'MB', [12.8433, 79.1363], 60),
  createAcademicRoom('mb_r5', 'MB_Room5', 'MB', [12.8434, 79.1364], 60),
  createAcademicRoom('mb_r6', 'MB_Room6', 'MB', [12.8430, 79.1365], 60),
  createAcademicRoom('mb_r7', 'MB_Room7', 'MB', [12.8431, 79.1366], 60),
  createAcademicRoom('mb_r8', 'MB_Room8', 'MB', [12.8432, 79.1367], 60),
  createAcademicRoom('mb_r9', 'MB_Room9', 'MB', [12.8433, 79.1368], 60),
  createAcademicRoom('mb_r10', 'MB_Room10', 'MB', [12.8434, 79.1369], 60),
];

// SJT Block Rooms (10 rooms)
const sjtRooms: Building[] = [
  createAcademicRoom('sjt_r1', 'SJT_Room1', 'SJT', [12.8440, 79.1370], 60),
  createAcademicRoom('sjt_r2', 'SJT_Room2', 'SJT', [12.8441, 79.1371], 60),
  createAcademicRoom('sjt_r3', 'SJT_Room3', 'SJT', [12.8442, 79.1372], 60),
  createAcademicRoom('sjt_r4', 'SJT_Room4', 'SJT', [12.8443, 79.1373], 60),
  createAcademicRoom('sjt_r5', 'SJT_Room5', 'SJT', [12.8444, 79.1374], 60),
  createAcademicRoom('sjt_r6', 'SJT_Room6', 'SJT', [12.8440, 79.1375], 60),
  createAcademicRoom('sjt_r7', 'SJT_Room7', 'SJT', [12.8441, 79.1376], 60),
  createAcademicRoom('sjt_r8', 'SJT_Room8', 'SJT', [12.8442, 79.1377], 60),
  createAcademicRoom('sjt_r9', 'SJT_Room9', 'SJT', [12.8443, 79.1378], 60),
  createAcademicRoom('sjt_r10', 'SJT_Room10', 'SJT', [12.8444, 79.1379], 60),
];

// PRP Block Rooms (10 rooms)
const prpRooms: Building[] = [
  createAcademicRoom('prp_r1', 'PRP_Room1', 'PRP', [12.8450, 79.1380], 60),
  createAcademicRoom('prp_r2', 'PRP_Room2', 'PRP', [12.8451, 79.1381], 60),
  createAcademicRoom('prp_r3', 'PRP_Room3', 'PRP', [12.8452, 79.1382], 60),
  createAcademicRoom('prp_r4', 'PRP_Room4', 'PRP', [12.8453, 79.1383], 60),
  createAcademicRoom('prp_r5', 'PRP_Room5', 'PRP', [12.8454, 79.1384], 60),
  createAcademicRoom('prp_r6', 'PRP_Room6', 'PRP', [12.8450, 79.1385], 60),
  createAcademicRoom('prp_r7', 'PRP_Room7', 'PRP', [12.8451, 79.1386], 60),
  createAcademicRoom('prp_r8', 'PRP_Room8', 'PRP', [12.8452, 79.1387], 60),
  createAcademicRoom('prp_r9', 'PRP_Room9', 'PRP', [12.8453, 79.1388], 60),
  createAcademicRoom('prp_r10', 'PRP_Room10', 'PRP', [12.8454, 79.1389], 60),
];

// MGB Block Rooms (10 rooms)
const mgbRooms: Building[] = [
  createAcademicRoom('mgb_r1', 'MGB_Room1', 'MGB', [12.8460, 79.1390], 60),
  createAcademicRoom('mgb_r2', 'MGB_Room2', 'MGB', [12.8461, 79.1391], 60),
  createAcademicRoom('mgb_r3', 'MGB_Room3', 'MGB', [12.8462, 79.1392], 60),
  createAcademicRoom('mgb_r4', 'MGB_Room4', 'MGB', [12.8463, 79.1393], 60),
  createAcademicRoom('mgb_r5', 'MGB_Room5', 'MGB', [12.8464, 79.1394], 60),
  createAcademicRoom('mgb_r6', 'MGB_Room6', 'MGB', [12.8460, 79.1395], 60),
  createAcademicRoom('mgb_r7', 'MGB_Room7', 'MGB', [12.8461, 79.1396], 60),
  createAcademicRoom('mgb_r8', 'MGB_Room8', 'MGB', [12.8462, 79.1397], 60),
  createAcademicRoom('mgb_r9', 'MGB_Room9', 'MGB', [12.8463, 79.1398], 60),
  createAcademicRoom('mgb_r10', 'MGB_Room10', 'MGB', [12.8464, 79.1399], 60),
];

// Libraries
const libraries: Building[] = [
  {
    id: 'lib_main',
    name: 'Main Library',
    category: 'library',
    coordinates: [12.8380, 79.1300],
    status: 'optimal',
    ...generateLocationData(800, 400),
  },
];

// Transport Points
const transportPoints: Building[] = [
  {
    id: 'shuttle_main_gate',
    name: 'Shuttle Stop Main Gate',
    category: 'shuttle_stop',
    coordinates: [12.8300, 79.1250],
    status: 'optimal',
    ...generateLocationData(150, 60),
  },
  {
    id: 'shuttle_sjt',
    name: 'Shuttle Stop SJT',
    category: 'shuttle_stop',
    coordinates: [12.8440, 79.1320],
    status: 'optimal',
    ...generateLocationData(150, 60),
  },
];

// Entry/Exit Gates
const gates: Building[] = [
  {
    id: 'outing_gate_1',
    name: 'Outing Gate 1',
    category: 'outing_gate',
    coordinates: [12.8250, 79.1200],
    status: 'optimal',
    ...generateLocationData(200, 80),
  },
];

// Mess/Dining
const messHalls: Building[] = [
  {
    id: 'mess_d',
    name: 'Mess D',
    category: 'mess',
    coordinates: [12.8310, 79.1315],
    status: 'optimal',
    ...generateLocationData(400, 200),
  },
  {
    id: 'mess_e',
    name: 'Mess E',
    category: 'mess',
    coordinates: [12.8320, 79.1316],
    status: 'optimal',
    ...generateLocationData(400, 200),
  },
  {
    id: 'mess_g',
    name: 'Mess G',
    category: 'mess',
    coordinates: [12.8330, 79.1317],
    status: 'optimal',
    ...generateLocationData(400, 180),
  },
  {
    id: 'mess_h',
    name: 'Mess H',
    category: 'mess',
    coordinates: [12.8340, 79.1318],
    status: 'optimal',
    ...generateLocationData(400, 220),
  },
  {
    id: 'mess_s',
    name: 'Mess S',
    category: 'mess',
    coordinates: [12.8350, 79.1319],
    status: 'optimal',
    ...generateLocationData(400, 190),
  },
  {
    id: 'mess_t',
    name: 'Mess T',
    category: 'mess',
    coordinates: [12.8360, 79.1320],
    status: 'optimal',
    ...generateLocationData(400, 210),
  },
  {
    id: 'mess_p',
    name: 'Mess P',
    category: 'mess',
    coordinates: [12.8370, 79.1321],
    status: 'optimal',
    ...generateLocationData(400, 200),
  },
  {
    id: 'mess_m',
    name: 'Mess M',
    category: 'mess',
    coordinates: [12.8380, 79.1322],
    status: 'optimal',
    ...generateLocationData(400, 180),
  },
];

// Food/Hangout Spots
const foodSpots: Building[] = [
  {
    id: 'cafe_lib_nescafe',
    name: 'Cafeteria Library Nescafe',
    category: 'food_spot',
    coordinates: [12.8385, 79.1305],
    status: 'optimal',
    ...generateLocationData(200, 120),
  },
  {
    id: 'cafe_sjt_nescafe',
    name: 'Cafeteria SJT Nescafe',
    category: 'food_spot',
    coordinates: [12.8445, 79.1325],
    status: 'optimal',
    ...generateLocationData(200, 140),
  },
  {
    id: 'foodys',
    name: 'Foodys',
    category: 'food_spot',
    coordinates: [12.8390, 79.1310],
    status: 'optimal',
    ...generateLocationData(300, 200),
  },
  {
    id: 'kc_food_court',
    name: 'KC Food Court',
    category: 'food_spot',
    coordinates: [12.8400, 79.1315],
    status: 'optimal',
    ...generateLocationData(350, 220),
  },
  {
    id: 'fc_food_court',
    name: 'FC Food Court',
    category: 'food_spot',
    coordinates: [12.8410, 79.1320],
    status: 'optimal',
    ...generateLocationData(350, 240),
  },
];

/**
 * Combined list of all campus locations
 */
export const allCampusLocations: Building[] = [
  ...smvRooms,
  ...ttRooms,
  ...gdnRooms,
  ...mbRooms,
  ...sjtRooms,
  ...prpRooms,
  ...mgbRooms,
  ...libraries,
  ...transportPoints,
  ...gates,
  ...messHalls,
  ...foodSpots,
];

/**
 * Get locations by category
 */
export const getLocationsByCategory = (
  category: LocationCategory
): Building[] => {
  return allCampusLocations.filter((loc) => loc.category === category);
};

/**
 * Get locations by block
 */
export const getLocationsByBlock = (block: string): Building[] => {
  return allCampusLocations.filter((loc) => loc.block === block);
};

/**
 * Get all unique blocks with academic rooms
 */
export const getAcademicBlocks = (): string[] => {
  const blocks = new Set(
    allCampusLocations
      .filter((loc) => loc.category === 'academic_room')
      .map((loc) => loc.block!)
  );
  return Array.from(blocks).sort();
};

/**
 * Get all categories with translation
 */
export const CATEGORY_LABELS: Record<LocationCategory, string> = {
  academic_room: '📚 Academic Rooms',
  library: '📖 Library',
  shuttle_stop: '🚍 Shuttle Stops',
  outing_gate: '🚪 Gates',
  mess: '🍴 Mess Halls',
  food_spot: '🍕 Food & Hangout',
};

/**
 * Get category icon
 */
export const getCategoryIcon = (category: LocationCategory): string => {
  const icons: Record<LocationCategory, string> = {
    academic_room: '📚',
    library: '📖',
    shuttle_stop: '🚍',
    outing_gate: '🚪',
    mess: '🍴',
    food_spot: '🍕',
  };
  return icons[category];
};
