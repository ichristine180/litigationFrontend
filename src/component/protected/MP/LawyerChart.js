import React from "react";
import ReactApexChart from "react-apexcharts";

const LawyerChart = ({ data }) => {
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
        data,
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
