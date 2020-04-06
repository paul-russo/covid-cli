# covid-cli

View basic statistics about the COVID-19 pandemic in your terminal. Uses [data aggregated by Johns Hopkins](https://github.com/CSSEGISandData/COVID-19) and helpfully [formatted by Rodrigo Pombo](https://github.com/pomber/covid19).

## Arguments

All arguments are optional

`-s`
- Specify a metric to sort by.
- Metrics are `confirmed`, `recovered`, `deaths`, and `mortality`.
- Default is `confirmed`.
- Example: `covid -s recovered`

`-l`
- Limit countries by minimum number of confirmed cases.
- Default is `0` (no limit)
- Example: `covid -l 100`

`-c`
- Filter for a country, or part of a country name.
- Default is no filter.
- Example: `covid -c US`

`-d`
- Specify a date in the format `YYYY-M-D`
- Default is the latest data, generally today's date.
- Example: `covid -d 2020-3-12`

## Install

You'll need to install [deno](https://deno.land/) first, and add `$HOME/.deno/bin` to your `$PATH`.

Then run this in your terminal:

```
deno install --allow-net covid https://raw.githubusercontent.com/paul-russo/covid-cli/master/mod.ts
```
