export enum IncidentCategory {
  ABANDONED_VEHICLES = 'abandoned_vehicles',
  BUS_STOP = 'bus_stop',
  ENFORCEMENT = 'enforcement',
  GRAFITI = 'grafiti',
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
