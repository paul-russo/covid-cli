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
- Example: `covid -s 100`

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

## Note

I've found myself obsessively refreshing the Johns Hopkins coronavirus map for the past couple of weeks. I'm not sure what I'm hoping will be there each time the page loads; maybe I'm hoping that I'll somehow catch the very moment where the slope of the graphs begins to decrease, meaning the spread has started slowing. From what I understand, it'll be a long time until we see that moment, but we'll get there eventually.

This tool doesn't provide any insight that can't be found elsewhere but I hope that, if anything, having slightly quicker access to this data might bring some weird sense of control or reassurance or normalcy or... something.

Weird times.
Take care.
