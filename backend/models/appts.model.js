import mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

const apptSchema = new Schema(
  {
    email: { type: String, required: true },
    createDate: { type: Date, required: true },
    apptDate: { type: Date, required: true },
    doseType: { type: String, required: true},
    doseNum: { type: Number, required: true},
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointments", apptSchema);
//module.exports = Event; 
export default Appointment; 