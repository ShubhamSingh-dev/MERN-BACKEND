import captainModel from "../models/captain.model.js";

export const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  vehicle,
}) => {
  if (!firstname || !lastname || !email || !password || !vehicle) {
    throw new Error("All fields are required");
  }

  const captain = new captainModel({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    },
  });

  return await captain.save();
};
