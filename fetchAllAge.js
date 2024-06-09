async function fetchTotalPopulation(apiKey) {
  const queryURL = `https://api.census.gov/data/2019/acs/acs5?get=B01003_001E,NAME&for=county:051&in=state:41&key=${apiKey}`;
  const response = await fetch(queryURL);
  const data = await response.json();
  return parseInt(data[1][0]);
}

async function fetchAgeBreakdown(apiKey) {
  const queryURL = `https://api.census.gov/data/2019/acs/acs5?get=B01001_003E,B01001_004E,B01001_005E,B01001_006E,B01001_007E,B01001_008E,B01001_009E,B01001_010E,B01001_011E,B01001_012E,B01001_013E,B01001_014E,B01001_015E,B01001_016E,B01001_017E,B01001_018E,B01001_019E,B01001_020E,B01001_021E,B01001_022E,B01001_023E,B01001_024E,B01001_025E,B01001_027E,B01001_028E,B01001_029E,B01001_030E,B01001_031E,B01001_032E,B01001_033E,B01001_034E,B01001_035E,B01001_036E,B01001_037E,B01001_038E,B01001_039E,B01001_040E,B01001_041E,B01001_042E,B01001_043E,B01001_044E,B01001_045E,B01001_046E,B01001_047E,B01001_048E,B01001_049E,NAME&for=county:051&in=state:41&key=${apiKey}`;
  const response = await fetch(queryURL);
  const data = await response.json();

  const columns = data[0];
  const values = data[1];

  // Create a mapping of column names to age groups
  const ageGroups = {
    "18-30": parseInt(values[columns.indexOf("B01001_007E")]) + parseInt(values[columns.indexOf("B01001_008E")]) + parseInt(values[columns.indexOf("B01001_031E")]) + parseInt(values[columns.indexOf("B01001_032E")]),
    "31-40": parseInt(values[columns.indexOf("B01001_009E")]) + parseInt(values[columns.indexOf("B01001_010E")]) + parseInt(values[columns.indexOf("B01001_033E")]) + parseInt(values[columns.indexOf("B01001_034E")]),
    "41-50": parseInt(values[columns.indexOf("B01001_011E")]) + parseInt(values[columns.indexOf("B01001_012E")]) + parseInt(values[columns.indexOf("B01001_035E")]) + parseInt(values[columns.indexOf("B01001_036E")]),
    "51-60": parseInt(values[columns.indexOf("B01001_013E")]) + parseInt(values[columns.indexOf("B01001_014E")]) + parseInt(values[columns.indexOf("B01001_037E")]) + parseInt(values[columns.indexOf("B01001_038E")]),
    "61plus": parseInt(values[columns.indexOf("B01001_015E")]) + parseInt(values[columns.indexOf("B01001_016E")]) + parseInt(values[columns.indexOf("B01001_017E")]) + parseInt(values[columns.indexOf("B01001_018E")]) + parseInt(values[columns.indexOf("B01001_019E")]) + parseInt(values[columns.indexOf("B01001_020E")]) + parseInt(values[columns.indexOf("B01001_021E")]) + parseInt(values[columns.indexOf("B01001_022E")]) + parseInt(values[columns.indexOf("B01001_041E")]) + parseInt(values[columns.indexOf("B01001_042E")]) + parseInt(values[columns.indexOf("B01001_043E")]) + parseInt(values[columns.indexOf("B01001_044E")]) + parseInt(values[columns.indexOf("B01001_045E")]) + parseInt(values[columns.indexOf("B01001_046E")])
  };

  return ageGroups;
}
