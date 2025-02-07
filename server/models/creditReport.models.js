import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String
});
const creditReport = new mongoose.Schema(
  {
    basicDetails: {
      name: {
        type: String,
        required: true,
      },
      mobilePhone: {
        type: String,
        required: true,
      },
      pan: {
        type: String,
        required: true,
      },
      creditScore: {
        type: Number,
        required: true,
      },
    },
    reportSummary: {
      totalAccount: { type: Number, required: true },
      activeAccount: { type: Number, required: true },
      closedAccount: { type: Number, required: true },
      currentBalance: { type: Number, required: true },
      securedBalance: { type: Number, required: true },
      unsecuredBalance: { type: Number, required: true },
      last7DaysCredit: { type: Number, required: true },
  },
  
    accountInformation: [{
      creditCard: { type: String, required: true }, 
      bankOfCreditCard: { type: String, required: true },
      address: addressSchema, 
      accountNumber: { type: String, required: true }, 
      amountOverdue: { type: Number, required: true },
      currentBalance: { type: Number, required: true },
  }],
  
  },
  { timestamps: true }
);

const Credit = mongoose.model("Credit", creditReport);

export default Credit;
