import { motion } from "framer-motion";

const BookingSummary = ({ eventName, selectedSeats, onReserve, isLoading }) => {
  const hasSelection = selectedSeats.length > 0;
  const isDisabled = !hasSelection || isLoading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky bottom-4 z-20 rounded-2xl border border-border-dark bg-surface-dark p-lg shadow-modal"
    >
      <div className="flex flex-col gap-lg sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-caption uppercase tracking-wide text-textSecondaryDark">
            {eventName}
          </p>

          <div className="mt-xs flex flex-wrap items-center gap-xs">
            {hasSelection ? (
              selectedSeats.map((seat) => (
                <span
                  key={seat}
                  className="rounded-md bg-primary/10 px-sm py-xs text-body-sm font-medium text-primary"
                >
                  {seat}
                </span>
              ))
            ) : (
              <span className="text-body-sm text-textSecondaryDark">
                No seats selected yet
              </span>
            )}
          </div>

          <p className="mt-sm text-body-sm text-textSecondaryDark">
            Total seats:{" "}
            <span className="font-semibold text-textPrimaryDark">
              {selectedSeats.length}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={onReserve}
          disabled={isDisabled}
          className={`flex w-full items-center justify-center gap-sm rounded-xl py-md text-body-md font-semibold shadow-button transition sm:w-auto sm:px-2xl ${
            isDisabled
              ? "cursor-not-allowed bg-surface-muted text-textSecondaryDark"
              : "bg-primary text-white hover:bg-primary-dark active:scale-[0.97]"
          }`}
        >
          {isLoading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {isLoading ? "Reserving..." : "Reserve Seats"}
        </button>
      </div>
    </motion.div>
  );
};

export default BookingSummary;