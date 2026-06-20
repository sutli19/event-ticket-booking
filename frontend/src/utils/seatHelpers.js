export const groupSeatsByRows = (seats) => {
  const rowMap = {};

  seats.forEach((seat) => {
    const rowLetter = seat.seatNumber.charAt(0);

    if (!rowMap[rowLetter]) {
      rowMap[rowLetter] = [];
    }

    rowMap[rowLetter].push(seat);
  });

  const sortedRowLetters = Object.keys(rowMap).sort();

  return sortedRowLetters.map((rowLetter) =>
    rowMap[rowLetter].sort((a, b) => {
      const numA = parseInt(a.seatNumber.slice(1), 10);
      const numB = parseInt(b.seatNumber.slice(1), 10);
      return numA - numB;
    })
  );
};

export const countAvailableSeats = (seats) => {
  return seats.filter((seat) => seat.status === "available").length;
};