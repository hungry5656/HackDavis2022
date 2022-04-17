import mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

const apptSchema = new Schema(
  {
    email: { type: String, required: true },
    phoneNum: { type: String, required: true },
    // Save dates as string for simplicity
    lastApptDate: { type: String, required: false }, 
    nextApptDate: { type: String, required: false }, // subtract 7d from this to get notification date
    doseType: { type: String, required: true},
    doseNum: { type: Number, required: true},
    petType: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointments", apptSchema); 
export default Appointment; 