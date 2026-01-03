import { useNavigate } from "react-router-dom";
import bgImg from "../assets/Background/landing_bg.jpg";
import logoImg from "../assets/images/ApnaTripLogo.png";

const Landing = () => {
  const navigate = useNavigate();

  const openHome = () => {
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full font-[Poppins] text-gray-700 bg-gray-100">
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-5"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="max-w-lg text-gray-800">
          <img
            src={logoImg}
            alt="Logo"
            className="w-24 h-24 mb-4 mx-auto"
          />
          <h1 className="text-3xl lg:text-5xl text-white font-bold mb-4">
            Apna Trip
          </h1>
          <h2 className="text-xl lg:text-2xl text-white mb-4">
            Discover new horizons and unforgettable adventures
          </h2>
          <p className="text-base text-white lg:text-lg mb-6">
            Explore charming places and magical adventures tailored just for you!
          </p>
          <button
            onClick={openHome}
            className="px-6 py-2 text-base lg:text-2xl bg-[#018989] text-white font-semibold hover:bg-[#025b5b] transition rounded-xl"
          >
            Let&apos;s Go!
          </button>
        </div>

        {/* Airplane Animation */}
        {/* <img
          src={aroplaneImg}
          alt="Airplane"
          className="absolute right-10 top-2 w-80 animate-fly"
        /> */}
      </section>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes fly {
          0% { transform: translateX(100px) rotate(-10deg); }
          100% { transform: translateX(-100vw) rotate(-10deg); }
        }
        .animate-fly { animation: fly 10s linear infinite; }
      `}</style>
    </div>
  );
};

export default Landing;
