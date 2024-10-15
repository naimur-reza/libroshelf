const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="min-w-[277px] min-h-[415px] bg-gray-600   animate-pulse  rounded-lg"
        ></div>
      ))}
    </div>
  );
};

export default Loading;
