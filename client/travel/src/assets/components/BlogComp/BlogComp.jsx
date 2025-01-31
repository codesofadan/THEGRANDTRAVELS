import React from "react";
import "./BlogComp.css";

const blogs = [
  {
    id: 1,
    title: "The Future of Design and Development",
    description: "Exploring the trends shaping the digital world.",
    link: "https://medium.com/some-blog-1",
    image: "blog1.jpg",
  },
  {
    id: 2,
    title: "How Branding Impacts Business Success",
    description: "Why branding is more than just a logo.",
    link: "https://medium.com/some-blog-2",
    image: "blog2.jpg",
  },
  {
    id: 3,
    title: "Creating User-Centric Experiences",
    description: "The art of blending usability and aesthetics.",
    link: "https://medium.com/some-blog-3",
    image: "blog3.jpg",
  },
    {
        id: 4,
        title: "The Power of Social Media Marketing",
        description: "Leveraging social platforms for brand growth.",
        link: "https://medium.com/some-blog-4",
        image: "blog1.jpg",
    },
    {
        id: 5,
        title: "The Future of Design and Development",
        description: "Exploring the trends shaping the digital world.",
        link: "https://medium.com/some-blog-5",
        image: "blog2.jpg",
    },
    {
        id: 6,
        title: "How Branding Impacts Business Success",
        description: "Why branding is more than just a logo.",
        link: "https://medium.com/some-blog-6",
        image: "blog3.jpg",
    },
];

const BlogComp = () => {
  return (
    <section className="blog-comp">
      <h2 className="blog-title">Latest Insights</h2>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-card-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-read-more"
              >
                Read Blog
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogComp;
