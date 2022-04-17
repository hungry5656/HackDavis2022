import mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

const apptSchema = new Schema(
  {
           email: { type: String, required: true },
        phoneNum: { type: String, required: true },
    lastApptDate: { type: Date, required: true }, 
    nextApptDate: { type: Date, required: true }, // subtract 7d from this to get notification date
        doseType: { type: String, required: true},
         doseNum: { type: Number, required: true},
         petType: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointments", apptSchema);
//module.exports = Event; 
export default Appointment; 