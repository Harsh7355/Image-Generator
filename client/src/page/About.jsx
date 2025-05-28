import React from 'react';
import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Who We Are</p>
              <h1>About Adhamkhor Technical</h1>
              <p>
                At Adhamkhor Technical, we are passionate about building innovative IT solutions
                that drive success for our clients. With a team of skilled developers, designers,
                and strategists, we deliver powerful software products, web applications, and
                digital services to take your business to the next level.
              </p>
              <p>
                Whether you're a startup or an enterprise, we believe in coding together,
                growing together.
              </p>
              <div className="btn btn-group">
                <NavLink to="/services">
                  <button className="btn">Our Services</button>
                </NavLink>
                <NavLink to="/contact">
                  <button className="btn secondary-btn">Contact Us</button>
                </NavLink>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="/images/about.png"
                alt="About us"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
