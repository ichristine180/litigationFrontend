import React from "react";

const LandingPage = () => {
  return (
    <section id="hero" className="d-flex align-items-center" style={{height: "90vh"}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1> Most Trusted Firm with successful cases</h1>
            <h2>
              Based in Kigali, FIDELIS ADVOCATES is an experienced Law Firm with
              a long and successful track record of offering high quality legal
              services to a wide range of clients including individuals with an
              overwhelming focus to business entities,FIDELIS ADVOCATES delivers
              services with the intervention of its experienced advocates
            </h2>
            <div>
              <a href="register" className="btn-get-started scrollto">
                Get Started
              </a>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img">
            <img src="assets/img/landing.jpg" className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
