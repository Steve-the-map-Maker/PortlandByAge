async function generatePieChart() {
  const apiKey = "74a87d99b53d3b3effd2bd3148493f810c40bb5e"; // Replace with your actual API key
  const totalPopulation = await fetchTotalPopulation(apiKey);
  const ageBreakdown = await fetchAgeBreakdown(apiKey);

  // Log the total population and age breakdown for verification
  console.log(`Total Population: ${totalPopulation}`);
  console.log("Age Breakdown:", ageBreakdown);

  const ageGroups = Object.keys(ageBreakdown).reduce((acc, group) => {
    acc[group] = ageBreakdown[group];
    return acc;
  }, {});

  const backgroundColors = Object.keys(ageGroups).map((group) => {
    const age = parseInt(group.match(/\d+/)[0]); // Get the lower bound of the age group
    return getAgeColor(age);
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
