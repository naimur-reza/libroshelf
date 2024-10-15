import TextReveal from "./Animation/TextReveal";
import bannerImage from "../assets/banner.jpg";

const Banner = () => {
  return (
    <div className="pt-[64px] min-h-screen">
      <div className="relative">
        <img className="h-screen -mt-[64px]" src={bannerImage} alt="" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-[2] bg-black/70">
        <TextReveal
          delay={0.5}
          text="Welcome to LibroShelf"
          color="text-white text-center     "
          fontSize="text-5xl"
        />
      </div>
    </div>
  );
};

export default Banner;
