import mongoose from "mongoose";

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
      totalAccount: {
        type: String,
        required: true,
      },
      activeAccount: {
        type: String,
        required: true,
      },
      closedAccount: {
        type: String,
        required: true,
      },
      currentBalance: {
        type: String,
        required: true,
      },
      securedBalance: {
        type: String,
        required: true,
      },
      unsecuredBalance: {
        type: String,
        required: true,
      },
      last7DaysCredit: {
        type: String,
        required: true,
      },
    },
    accountInformation: {
      creditCard: {
        type: String,
        required: true,
      },
      bankOfCreditCard: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
      },
      amountOverdue: {
        type: Number,
        required: true,
      },
      currentBalance: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Credit = mongoose.model("Credit", creditReport);

export default Credit;
