const SwipeCarousel = ({ elements }) => {
  return (
    <div className="flex flex-row gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {elements.map((value, index) => (
        <div key={index}>{value}</div>
      ))}
    </div>
  );
};

export default SwipeCarousel