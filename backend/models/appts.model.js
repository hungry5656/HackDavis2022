import mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

const eventsSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    attendees: { type: String, required: true }, 
    location : {
      type: {address: String, lat: Number, lon: Number}, 
      required: true
    },
    description: { type: String, required: true}, 
    date_time:{ type: Date, required: true}, 
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Events", eventsSchema);
//module.exports = Event; 
export default Event; 