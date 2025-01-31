import React from "react";
import "./Testimonials.css";

const testimonialsData = [
  {
    id: 1,
    name: "Aneeka H",
    country: "UK",
    testimonial: "The entire team go above and beyond to make the whole process of travelling as smooth as possible.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVx7iNV4IIgqVh7x1PL5p2jR7W5feVD78-cvNxIyXUzkTyuz86Qyw=w75-h75-p-rp-mo-ba5-br100",
  },
  {
    id: 2,
    name: "Qamar Shahzad",
    country: "UK",
    testimonial: "Fantastic service! Highly recommend to anyone!",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVq_wFgS87ex5vP6TlOtEB2w16Sd2VZPvo5oe_GulX8R4CWqA-R=w75-h75-p-rp-mo-ba3-br100",
  },
  {
    id: 3,
    name: "Mehr Haider",
    country: "Bradford",
    testimonial: "Great quality and fast delivery. Will definitely come back!",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVLK8iGMHjT1ecHJ1sR4uizzeH7ZwWmGcAt9BssuXSgkVdUtAF6=w75-h75-p-rp-mo-br100",
  },
  {
    id: 4,
    name: "John",
    country: "Mexico",
    testimonial: "Very happy with my purchase. Excellent customer service!",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    name: "Li Wei",
    country: "China",
    testimonial: "Exceeded expectations, would highly recommend!",
    image: "https://images.pexels.com/photos/8366854/pexels-photo-8366854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    name: "Krishna",
    country: "Pakistan",
    testimonial: "Extremely great experinece, surely book a second trip",
    image: "https://images.pexels.com/photos/21272660/pexels-photo-21272660/free-photo-of-portrait-of-man-with-facial-hair-wearing-chain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
    {
      id: 7,
      name: "Sahar Sahal",
      country: "India",
      testimonial: "Wonderful experience, the best trip ever!",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjWxDaJb4gdPvhQn4HUoL8jAAsKtVpuCOF8rWh3GCXo_RCPCPaTRug=w75-h75-p-rp-mo-ba4-br100",
    },
    {
      id: 8,
      name: "Aqeel Ahmed",
      country: "Australia",
      testimonial: "Top-notch service and amazing destinations!",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjU6upRBM-iVO4EEH4IFEEgBinUNppSbaG4gmyk3j1KAPsDsSUKp=w75-h75-p-rp-mo-br100",
    },
    {
      id: 9,
      name: "JDUK",
      country: "United Kingdom",
      testimonial: "Loved every moment of the trip, highly recommend!",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjWglJAD09cBvGYU2chk7t5RvRY41l_yE95s_y5RA80jFgrT6Cl5fg=w75-h75-p-rp-mo-br100",
    },
    {
      id: 10,
      name: "ATET",
      country: "Japan",
      testimonial: "Incredible journey, will definitely travel again!",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjXrJ98CxkFAdC9aAixvb-5OvBMEDTR7MlpOHCL28pBWEW2SwHh8_Q=w75-h75-p-rp-mo-ba3-br100",
    }

];

const Testimonials = () => {
  return (
    <div className="testimonial-section">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-slider">
        <div className="testimonial-track">
          {testimonialsData.concat(testimonialsData).map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <img src={testimonial.image} alt={testimonial.name} />
              <h3>{testimonial.name}</h3>
              <p className="country">{testimonial.country}</p>
              <p className="testimonial-text">"{testimonial.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;