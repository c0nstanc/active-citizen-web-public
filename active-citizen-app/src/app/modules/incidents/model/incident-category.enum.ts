export enum IncidentCategory {

  ABANDONED_SANTANDER_CYCLE = 'abandoned_santander_cycle',
  ABANDONED_VEHICLES = 'abandoned_vehicles',
  BUS_STOP_AND_SHELTERS = 'bus_stop_and_shelders',
  ENFORCEMENT = 'enforcement',
  GRAFFITI_AND_FLYPOSTING = 'grafiti_and_flyposting',
  PARKS_AND_GREENSPACE = 'parks_and_greenspace',
  PUBLIC_TREES = 'public_trees',
  PAVEMENT = 'pavement',
  STREET_CLEANSING = 'street_cleansing',
  STREET_LIGHTING = 'street_lighting',
  ROAD_SIGNS = 'road_signs',
  TRAFFIC_LIGHTS = 'traffic_lights',
  WATER = 'water',
  ROAD = 'road',
  ELECTRICITY = 'electricity',
  OTHER = 'other'
}


export function IncidentCategories(): Array<string> {

  const incidentCategories = new Array<IncidentCategory>();

  for (const n in IncidentCategory) {
    if (typeof IncidentCategory[n] === 'string') {
      incidentCategories.push(IncidentCategory[n]);
    }
  }
  return incidentCategories;
}
