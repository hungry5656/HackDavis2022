import mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

const eventsSchema = new Schema(
  {
    user: { type: String, required: true },
    createDate: { type: Date, required: true },
    apptDate: { type: Date, required: true },
    doseType: { type: String, required: true},
    doseNum: { type: Number, required: true},
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Events", eventsSchema);
//module.exports = Event; 
export default Event; 