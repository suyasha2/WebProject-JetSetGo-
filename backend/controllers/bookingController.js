exports.addBooking = async (req, res) => {
  try {
    const { fullName, email, phone, guests, travelDate, location_name, username } = req.body;
    
    if(!username) {
        return res.status(400).json({ success: false, message: "Username is required!" });
    }

    const newBooking = await Booking.create({
      fullName,
      email,
      phone,
      guests,
      travelDate,
      locationName: location_name,
      username 
    });

    res.status(200).json({ success: true, message: "Booking Successful!", data: newBooking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};