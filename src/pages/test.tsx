const isTimeBooked = (bookings: Booking[], date: Date, time: string) => {
  if (!Array.isArray(bookings)) return false;
  const [h, m] = time.split(":").map(Number);

  const slotStart = new Date(date);
  slotStart.setHours(h, m, 0, 0);

  const slotEnd = new Date(slotStart);
  slotEnd.setMinutes(slotEnd.getMinutes() + SLOT_MINUTES);

  return bookings.some((b) => {
    const bookingStart = new Date(b.start_time);
    const bookingEnd = new Date(b.end_time);

    return slotStart < bookingEnd && slotEnd > bookingStart;
  });
};
