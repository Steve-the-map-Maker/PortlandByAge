async function generateBarChart() {
  console.log("Generating bar chart...");
  // Check if fetchACSDemographicData is a function and call it
  if (typeof fetchACSDemographicData === "function") {
    await fetchACSDemographicData();
  } else {
    console.error("fetchACSDemographicData is not a function.");
    return;
  }

  // Add a check to ensure demographicDataByTract is not empty
  if (!Object.keys(demographicDataByTract).length) {
    console.error("Demographic data is empty.");
    return;
  }

  const ageRanges = {
    "18-30": 0,
    "31-40": 0,
    "41-50": 0,
    "51-60": 0,
    "61+": 0,
  };

  // Iterate through the demographic data to categorize census tracts by median age
  Object.values(demographicDataByTract).forEach(({ medianAge }) => {
    if (medianAge <= 30) ageRanges["18-30"]++;
    else if (medianAge <= 40) ageRanges["31-40"]++;
    else if (medianAge <= 50) ageRanges["41-50"]++;
    else if (medianAge <= 60) ageRanges["51-60"]++;
    else ageRanges["61+"]++;
  });

  console.log("Census tracts in each age range:", ageRanges);

  const ctx = document.getElementById("barChartCanvas").getContext("2d");
  const barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(ageRanges),
      datasets: [
        {
          label: "Number of Census Tracts by Median Age Range",
          data: Object.values(ageRanges),
          backgroundColor: [
            "#a5d8ff", // Light Blue
            "#ffeda0", // Light Yellow
            "#feb24c", // Orange
            "#f03b20", // Red
            "#a4d4ae", // Light Green
          ],
          borderColor: [
            "#83c0f4", // Darker Light Blue
            "#fed766", // Darker Light Yellow
            "#fd9a30", // Darker Orange
            "#e02401", // Darker Red
            "#88cc92", // Darker Light Green
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  generateBarChart();
});
