export interface CovidCountryData {
  name: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  mortality: number;
}

export interface CovidCountryDay {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface CovidData {
  [country: string]: CovidCountryDay[];
}
