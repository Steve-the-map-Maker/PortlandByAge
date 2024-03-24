// Fetches ACS demographic data and classifies tracts by median age
async function fetchACSDemographicData() {
  const apiKey = "74a87d99b53d3b3effd2bd3148493f810c40bb5e";
  const queryURL = `https://api.census.gov/data/2019/acs/acs5?get=B01003_001E,B01002_001E,NAME&for=tract:*&in=state:41+county:051&key=${apiKey}`;

  try {
    const response = await fetch(queryURL);
    const data = await response.json();
    // console.log("Demographic data by tract:", demographicDataByTract);
    data.slice(1).forEach((row) => {
      const tractCode = row[5]; // Use the tract code as the key
      demographicDataByTract[tractCode] = {
        population: row[0],
        medianAge: row[1],
      };
    });
  } catch (error) {
    return console.error("Error fetching ACS demographic data:", error);
  }
}
