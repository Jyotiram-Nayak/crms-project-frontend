import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <>
      <section
        className="relative w-full flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/cover/technology-image.png')",
          height: "40rem",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute bottom-0 w-full transform rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path
              className="fill-current text-gray dark:text-black"
              d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7 c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4 c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
            ></path>
          </svg>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col items-center">
            <div className="w-full text-center">
              <section className="box-border h-auto w-full">
                <div className="container mx-auto">
                  <div className="w-full">
                    <div className="py-4">
                      <div className="widget-heading">
                        <div>
                          <h2 className="text-4xl font-bold text-white mb-4">
                            Welcome to CareerForge
                          </h2>
                        </div>
                      </div>
                      <div className="widget-heading">
                        <div>
                          <h2 className="text-4xl font-bold text-white">
                            Building Careers, Shaping Futures
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <div className="m-20">
        <h1 className="my-8 text-5xl">Empower Your Journey</h1>
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base w-[auto] text-justify">
          <strong>
            Welcome to Career Forge, where education meets innovation.
            Established in 2024, Career Forge is dedicated to revolutionizing
            campus management with cutting-edge solutions tailored to meet the
            evolving needs of educational institutions.
            <br />
            <br />
            At Career Forge, we believe in empowering educational institutions
            to streamline their campus management processes and unlock new
            opportunities for growth and success. Our journey began with a
            vision: to simplify complex campus management tasks and enhance
            efficiency for administrators, faculty, and students alike.
            <br />
            <br />
            Our team at Career Forge consists of dynamic individuals with a
            shared passion for transforming the education sector. With expertise
            in technology, education, and business management, we bring a unique
            blend of skills to every project we undertake.
            <br />
            <br />
            Customer satisfaction lies at the core of our mission. We are
            committed to providing exceptional solutions and unparalleled
            support to our clients, ensuring that they achieve their goals with
            ease and confidence.
            <br />
            <br />
            As we continue to innovate and expand our offerings, Career Forge
            remains steadfast in our commitment to excellence, integrity, and
            continuous improvement. We are proud to be a trusted partner to
            educational institutions worldwide, helping them navigate the
            complexities of campus management with ease and efficiency.
            <br />
            <br />
            Thank you for choosing Career Forge. Together, let's forge a
            brighter future for education.
            <br />
          </strong>
        </p>
      </div>
    </>
  );
};

export default About;
