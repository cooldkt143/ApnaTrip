import React from 'react';

const Explore = ({ categories }) => {
  return (
    <section className="py-16 bg-[#1c3e40]">
      <div className="container mx-auto px-4">
        <p className="text-center text-2xl font-bold lg:text-[50px] font-['Abril_Fatface'] text-white mb-2">
          Features that We Offer
        </p>
        <h2 className="lg:text-6xl text-xl font-['Brush_Script_MT',cursive] text-center text-yellow-500 lg:mb-12">
          Explore!!!!
        </h2>

        {/* Grid container */}
        <div className="bg-teal-900/50 rounded-xl p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative h-40 lg:h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            >
              {/* Image */}
              <img
                src={category.img}
                alt={category.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-green-500/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-white p-4 text-center">
                <p className="text-sm mb-2">{category.subtitle}</p>
                <h3 className="text-2xl font-semibold">{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
