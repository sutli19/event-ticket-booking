const LEGEND_ITEMS = [
  { label: "Available", className: "bg-seat-available border border-seat-availableBorder" },
  { label: "Selected", className: "bg-seat-selected border border-seat-selectedBorder" },
  { label: "Reserved", className: "bg-seat-reserved border border-seat-reservedBorder" },
  { label: "Booked", className: "bg-seat-booked border border-seat-bookedBorder" },
];

const SeatLegend = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-lg">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-xs">
          <span className={`h-4 w-4 rounded-md ${item.className}`} />
          <span className="text-body-sm text-textSecondaryDark">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SeatLegend;