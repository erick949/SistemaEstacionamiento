import React from "react";

const teamMembers = [
  {
    name: "Carlos Martínez",
    role: "General Manager",
    image: "assets/img/team/team-1.jpg",
    social: {
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  },
  {
    name: "Elena Rodríguez",
    role: "Operations Supervisor",
    image: "assets/img/team/team-2.jpg",
    social: {
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  },
  {
    name: "Luis Fernández",
    role: "Technology Director",
    image: "assets/img/team/team-3.jpg",
    social: {
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  },
  {
    name: "María Gómez",
    role: "Customer Service Lead",
    image: "assets/img/team/team-4.jpg",
    social: {
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="team section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Our Team</h2>
        <p>Meet the people behind our parking services — dedicated to ensuring a safe, efficient, and friendly experience every day.</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="team-member">
                <div className="member-img">
                  <img src={member.image} className="img-fluid" alt={member.name} />
                  <div className="social">
                    <a href={member.social.twitter}><i className="bi bi-twitter-x"></i></a>
                    <a href={member.social.facebook}><i className="bi bi-facebook"></i></a>
                    <a href={member.social.instagram}><i className="bi bi-instagram"></i></a>
                    <a href={member.social.linkedin}><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <span>{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
