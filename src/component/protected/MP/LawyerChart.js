import React from "react";
import ReactApexChart from "react-apexcharts";

const LawyerChart = () => {
  const options = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    series: [
      {
        data: [
          {
            x: "category A",
            y: 10,
          },
          {
            x: "category B",
            y: 18,
          },
          {
            x: "category C",
            y: 13,
          },
        ],
      },
    ],
  };

  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Lawyers Chart</h5>
          <ReactApexChart
            options={options}
            series={options.series}
            type="bar"
            height={290}
          />
        </div>
      </div>
    </div>
  );
};

export default LawyerChart;
