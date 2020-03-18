import { parse } from "https://deno.land/std/flags/mod.ts";
import { green, red, bold } from "https://deno.land/std/fmt/colors.ts";

import { CovidData } from "./types.ts";

const { s, l, c, d } = parse(Deno.args);

let sortBy: "confirmed" | "recovered" | "deaths" | "mortality" = "confirmed";
let confirmedLimit = parseInt(l, 10) || 0;
let nameQuery = c ?? "";
let givenDate = d ?? "";

if (["confirmed", "recovered", "deaths", "mortality"].includes(s)) {
  sortBy = s;
}

const netStatus = await Deno.permissions.query({ name: "net" });

if (
  netStatus.state !== "granted" &&
  (await Deno.permissions.request({ name: "net" })).state !== "granted"
) {
  console.error("This tool needs to make network requests to work.");
  Deno.exit(1);
}

const data: CovidData = await fetch(
  "https://pomber.github.io/covid19/timeseries.json"
).then(resp => resp.json());

let totalConfirmed = 0;
let totalRecovered = 0;
let totalDeaths = 0;

let maxNameLength = "Global".length;

const countries = Object.entries(data)
  .map(([countryName, days]) => {
    const dateIndex = givenDate
      ? days.findIndex(day => day.date === givenDate)
      : days.length - 1;

    if (!dateIndex || dateIndex < 0) return null;

    const { confirmed, deaths, recovered } = days[dateIndex];

    totalConfirmed += confirmed;
    totalRecovered += recovered;
    totalDeaths += deaths;

    return {
      // Handles "Korea, South", etc.
      name: countryName
        .split(",")
        .reverse()
        .join(" ")
        .trim(),
      confirmed,
      deaths,
      recovered,
      mortality: deaths / confirmed
    };
  })
  .filter(country => {
    const result =
      country !== null &&
      country.confirmed > confirmedLimit &&
      country.name.includes(nameQuery);

    if (result && country!.name.length > maxNameLength)
      maxNameLength = country!.name.length;

    return result;
  })
  .sort((a, b) => {
    if (a![sortBy] < b![sortBy]) return -1;
    if (a![sortBy] > b![sortBy]) return 1;
    return 0;
  });

// Output header
const maxConfirmedLength = Math.max(`${totalConfirmed}`.length, 9);
const maxRecoveredLength = Math.max(`${totalRecovered}`.length, 9);
const maxDeathsLength = Math.max(`${totalDeaths}`.length, 6);

const divider = "-".repeat(
  maxNameLength + maxConfirmedLength + maxRecoveredLength + maxDeathsLength + 21
);

const nameHeading = "Name".concat(" ".repeat(maxNameLength - 4));
const confirmedHeading = "Confirmed".concat(" ".repeat(maxConfirmedLength - 9));
const recoveredHeading = "Recovered".concat(" ".repeat(maxRecoveredLength - 9));
const deathsHeading = "Deaths".concat(" ".repeat(maxDeathsLength - 6));

console.log(divider);
console.log(
  `${nameHeading} | ${confirmedHeading} | ${recoveredHeading} | ${deathsHeading} | Mortality`
);
console.log(divider);

// Output data
countries
  .concat({
    name: "Global",
    confirmed: totalConfirmed,
    deaths: totalDeaths,
    recovered: totalRecovered,
    mortality: totalDeaths / totalConfirmed
  })
  .forEach((country, index) => {
    if (country === null) return;

    const { name, confirmed, deaths, recovered, mortality } = country;
    const nameOut = name.concat(" ".repeat(maxNameLength - name.length));

    const confirmedOut = " "
      .repeat(maxConfirmedLength - `${confirmed}`.length)
      .concat(`${confirmed}`);

    const recoveredOut = " "
      .repeat(maxRecoveredLength - `${recovered}`.length)
      .concat(`${recovered}`);

    const deathsOut = " "
      .repeat(maxDeathsLength - `${deaths}`.length)
      .concat(`${deaths}`);

    const mortalityOut = `   ${(mortality * 100).toFixed(3).slice(0, 5)}%`;

    if (index === countries.length) {
      console.log(divider);
    }

    console.log(
      `${bold(nameOut)} | ${bold(confirmedOut)} | ${bold(
        green(recoveredOut)
      )} | ${bold(red(deathsOut))} | ${bold(mortalityOut)}`
    );
  });

console.log(divider);
