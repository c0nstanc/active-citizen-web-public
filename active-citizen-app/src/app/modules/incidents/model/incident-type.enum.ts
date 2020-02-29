export enum IncidentType {
  WATER = 'water',
  ROAD = 'road',
  ELECTRICITY = 'electricity',
  OTHER = 'other'
}


export function IncidentTypes(): Array<string> {

  const incidentTypes = new Array<IncidentType>();

  for (const n in IncidentType) {
    if (typeof IncidentType[n] === 'string') {
      incidentTypes.push(IncidentType[n]);
    }
  }

  return incidentTypes;

}
