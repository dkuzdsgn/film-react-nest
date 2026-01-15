import mongoose, { Schema } from 'mongoose';

const ScheduleSchema = new Schema({
  id: String,
  daytime: String,
  hall: Number,
  rows: Number,
  seats: Number,
  price: Number,
  taken: [String],
});

const FilmSchema = new Schema({
  id: { type: String, required: true },
  rating: Number,
  director: String,
  tags: [String],
  image: String,
  cover: String,
  title: String,
  about: String,
  description: String,
  schedule: [ScheduleSchema],
});

export const FilmModel = mongoose.model('Film', FilmSchema);
