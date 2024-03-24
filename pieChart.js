async function generatePieChart() {
  console.log("Generating pie chart...");
  await fetchACSDemographicData(); // Ensure data is fetched

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

  // Proceed with the rest of the generatePieChart function...
  const ageGroups = {
    "18-30": 0,
    "31-40": 0,
    "41-50": 0,
    "51-60": 0,
    "61+": 0,
  };

  function getAgeColor(medianAge) {
    if (medianAge <= 18) return "#f2d2e9"; // Light Purple
    if (medianAge <= 30) return "#a5d8ff"; // Light Blue
    if (medianAge <= 40) return "#ffeda0"; // Light Yellow
    if (medianAge <= 50) return "#feb24c"; // Orange
    if (medianAge <= 60) return "#f03b20"; // Red
    return "#a4d4ae"; // Light Green for 61+
  }

  // Iterate through the demographic data to categorize and sum populations
  Object.values(demographicDataByTract).forEach(({ population, medianAge }) => {
    if (medianAge <= 30) ageGroups["18-30"] += parseInt(population);
    else if (medianAge <= 40) ageGroups["31-40"] += parseInt(population);
    else if (medianAge <= 50) ageGroups["41-50"] += parseInt(population);
    else if (medianAge <= 60) ageGroups["51-60"] += parseInt(population);
    else ageGroups["61+"] += parseInt(population);
  });

  console.log("Age groups with populations:", ageGroups);

  const backgroundColors = Object.keys(ageGroups).map((group) => {
    const age = group.split("-")[0]; // Get the lower bound of the age group
    return getAgeColor(parseInt(age));
  });

  const ctx = document.getElementById("pieChartCanvas").getContext("2d");
  const pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(ageGroups),
      datasets: [
        {
          label: "Population by Age Group",
          data: Object.values(ageGroups),
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map((color) =>
            color.replace(/0\.\d+\)/, "1)")
          ), // Replace opacity with 1 for borders
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  generatePieChart();
});
