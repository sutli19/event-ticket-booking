import { motion } from "framer-motion";

const STATUS_STYLES = {
  available:
    "bg-seat-available border-seat-availableBorder text-textSecondaryDark hover:border-primary cursor-pointer",
  selected:
    "bg-seat-selected border-seat-selectedBorder text-white cursor-pointer",
  reserved:
    "bg-seat-reserved border-seat-reservedBorder text-textPrimary cursor-not-allowed opacity-80",
  booked:
    "bg-seat-booked border-seat-bookedBorder text-textSecondaryDark cursor-not-allowed opacity-60",
};

const SeatGrid = ({ seatRows, selectedSeats, onToggleSeat }) => {
  const getSeatStatus = (seat) => {
    if (selectedSeats.includes(seat.seatNumber)) return "selected";
    return seat.status;
  };

  return (
    <div className="flex flex-col items-center gap-sm">
      {seatRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-sm">
          <span className="w-5 text-caption font-medium text-textSecondaryDark">
            {row[0]?.seatNumber?.charAt(0)}
          </span>

          <div className="flex gap-xs sm:gap-sm">
            {row.map((seat) => {
              const status = getSeatStatus(seat);
              const isDisabled = status === "reserved" || status === "booked";

              return (
                <motion.button
                  key={seat.seatNumber}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => !isDisabled && onToggleSeat(seat.seatNumber)}
                  whileTap={!isDisabled ? { scale: 0.9 } : {}}
                  animate={
                    status === "selected"
                      ? { scale: [1, 1.15, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border text-[10px] font-semibold transition sm:h-9 sm:w-9 sm:text-caption ${STATUS_STYLES[status]}`}
                >
                  {seat.seatNumber}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;