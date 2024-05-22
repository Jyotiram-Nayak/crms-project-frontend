import { url } from 'inspector';
import Image from 'next/image';

const services = [
  {
    id: 1,
    title: 'Company Spotlight',
    description: 'Explore featured companies that are leading innovation in their respective industries. From tech giants to cutting-edge startups, discover exciting career opportunities waiting for you.',
    imageUrl: '/images/icon/company.png',
  },
  {
    id: 2,
    title: 'University Partnerships',
    description: 'Get information on our partnerships with top universities across the globe. Find out more about internship programs, career fairs as well as networking events that have been specifically organized to make your academic trip better and lay good foundation for your future career life.',
    imageUrl: '/images/icon/university.png',
  },
  {
    id: 3,
    title: 'Student Success Stories',
    description: 'Hear from students who have leveraged our recruiting services to land their dream jobs. Get inspired by their experiences, achievements, and valuable insights into navigating the job market.',
    imageUrl: '/images/icon/student.png',
  },
];

const ServicesSection = () => {
  return (
    <section className="flex flex-wrap h-screen items-center justify-center p-6 border-y-12 border-y-stone-950 bg-fixed bg-center bg-cover" style={{backgroundImage:'url("/images/cover/technology-image.png")'}}>
      <div className="w-full max-w-7xl">
        <div className="flex flex-wrap -mx-4">
          {services.map((service) => (
            <div key={service.id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 ">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center bg-white" style={{height: "25rem"}}>
                <figure className="flex justify-center mb-4 h-40">
                  <Image src={service.imageUrl} alt={service.title} width={150} height={150} className="rounded-full" />
                </figure>
                <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
