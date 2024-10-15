import TextReveal from "./Animation/TextReveal";
import bannerImage from "../assets/banner.jpg";

const Banner = () => {
  return (
    <div className="pt-[64px] min-h-screen">
      <div className="relative">
        <img className="h-screen -mt-[64px]" src={bannerImage} alt="" />
      </div>
      <div className="absolute inset-0 flex-col flex items-center justify-center z-[2] bg-black/70 gap-3">
        <TextReveal
          delay={0.5}
          text="Welcome to LibroShelf"
          color="text-white text-center     "
          fontSize="lg:text-5xl text-4xl font-bold"
        />
        <TextReveal
          delay={1}
          text="Discover a World of Free Classics and Modern Reads"
          color="text-gray-300 text-center"
          fontSize="lg:text-2xl text-xl px-10 lg:px-10"
        />
      </div>
    </div>
  );
};

export default Banner;
