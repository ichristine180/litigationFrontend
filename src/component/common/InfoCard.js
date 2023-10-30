import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoCard = ({ title, icon, value, classN }) => {
    const date = new Date();
    return (
      <div className="col-xxl-4 col-md-6">
        <div className={`card info-card ${classN}-card`}>
          <div className="filter">
            <p className="icon">
              <i className="bi bi-three-dots"></i>
            </p>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {title} <span>| {date.toLocaleDateString("en-GB")}</span>
            </h5>
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon={icon} />
              </div>
              <div className="ps-3">
                <h6>{value}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default InfoCard