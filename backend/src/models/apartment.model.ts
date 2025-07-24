import mongoose from 'mongoose';

const apartmentSchema = new mongoose.Schema({
  unitName: String,
  unitNumber: String,
  project: String,
  description: String,
  imageUrl: String,
  area: Number,
  bedrooms: Number,
  deliveryDate: String,
  price:Number
  //  {
  //   type: Number,
  //   required: true,
  // },
});


export const Apartment = mongoose.model('Apartment', apartmentSchema);
