import React from "react";
import ReactApexChart from "react-apexcharts";

const CategoriesChart = () => {
  const chartOptions = {
    series: [44, 55, 13, 43],
    chart: {
      height: 350,
      type: "pie",
    },
    labels: ["Family", "Criminal defense", "Real estate", "Personal injury"],
  };

  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Case categories Chart</h5>

          <ReactApexChart
            options={chartOptions}
            series={chartOptions.series}
            type="pie"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesChart;
