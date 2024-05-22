"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const brands = [
  {
    id: 1,
    src: "/images/brands/google.png",
    alt: "Google Logo",
    width: 1024,
    height: 346,
    sizes: "(max-width: 1024px) 100vw, 1024px",
  },
  {
    id: 2,
    src: "/images/brands/lanetLogo.png",
    alt: "La Net Logo",
    width: 1024,
    height: 340,
    sizes: "(max-width: 1024px) 100vw, 1024px",
  },
  {
    id: 3,
    src: "/images/brands/crmone.png",
    alt: "CrmOne Logo",
    width: 1024,
    height: 364,
    sizes: "(max-width: 1024px) 100vw, 1024px",
  },
  {
    id: 4,
    src: "/images/brands/microsoft.png",
    alt: "Microsoft Logo",
    width: 308,
    height: 164,
    sizes: "(max-width: 308px) 100vw, 308px",
  },
  {
    id: 5,
    src: "/images/brands/tcs.png",
    alt: "Tcs Logo",
    width: 407,
    height: 124,
    sizes: "(max-width: 407px) 100vw, 407px",
  },
  {
    id: 6,
    src: "/images/brands/tech_mahindra.png",
    alt: "tech_mahindra Logo",
    width: 407,
    height: 124,
    sizes: "(max-width: 407px) 100vw, 407px",
  },
  {
    id: 7,
    src: "/images/brands/Infosys_logo.png",
    alt: "Infosys Logo",
    width: 407,
    height: 124,
    sizes: "(max-width: 407px) 100vw, 407px",
  },
  {
    id: 8,
    src: "/images/brands/HCL.png",
    alt: "HCL Logo",
    width: 407,
    height: 124,
    sizes: "(max-width: 407px) 100vw, 407px",
  },
  {
    id: 9,
    src: "/images/brands/landt.png",
    alt: "l&t Logo",
    width: 407,
    height: 124,
    sizes: "(max-width: 407px) 100vw, 407px",
  },
];

const BrandSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
    }, 3000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center py-6 bg-slate-600 ">
        <h1 className="text-5xl font-bold underline text-white">
          TOP COMPANIES
        </h1>
      </div>
      <section className="relative flex flex-col items-center py-6 bg-white ">
        <div className="w-full max-w-7xl overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
            }}
          >
            {brands.map((brand, index) => (
              <div
                key={brand.id}
                className="flex flex-shrink-0 align-middle w-full sm:w-1/5 p-4"
                style={{ flexBasis: `${100 / slidesToShow}%` }}
              >
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  width={brand.width}
                  height={brand.height}
                  sizes={brand.sizes}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? brands.length - 1 : prevIndex - 1
              )
            }
            className="p-2 bg-gray-700 rounded-full text-white w-30 h-full"
          ></button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) => {
                if (prevIndex === brands.length - 1) {
                  return 0;
                } else {
                  return (prevIndex + 1) % brands.length;
                }
              })
            }
            className="p-2 bg-gray-700 rounded-full text-white w-30 h-full"
          ></button>
        </div>
      </section>
    </>
  );
};

export default BrandSection;
