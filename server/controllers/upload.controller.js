import fs from "fs";
import xml2js from "xml2js";
import path from "path";
import Credit from "../models/creditReport.models.js";

export const uploadController = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res
        .status(400)
        .json({ message: " No file uploaded or file path missing" });
    }

    const xmlData = fs.readFileSync(req.file.path, "utf-8");
    const parser = new xml2js.Parser({ explicitArray: false });

    let result;
    try {
      result = await parser.parseStringPromise(xmlData);
    } catch (err) {
      return res.status(400).json({ message: " Invalid XML format" });
    }

    if (!result || typeof result.INProfileResponse !== "object") {
      return res.status(400).json({ message: " Invalid XML structure" });
    }

    const profile =
      result?.INProfileResponse?.Current_Application
        ?.Current_Application_Details?.Current_Applicant_Details || {};
    const score = parseInt(result?.INProfileResponse?.SCORE?.BureauScore) || 0;

   
    const pan =
      result?.INProfileResponse?.CAIS_Account?.CAIS_Account_DETAILS?.[0]
        ?.CAIS_Holder_Details?.Income_TAX_PAN || "Unknown";

    console.log("Extracted PAN:", pan);

    const summary = result?.INProfileResponse?.CAIS_Account?.CAIS_Summary || {};
    const balance = summary?.Total_Outstanding_Balance || {};
    const creditAccount = summary?.Credit_Account || {};

    const reportSummary = {
      totalAccount: parseInt(creditAccount?.CreditAccountTotal) || 0,
      activeAccount: parseInt(creditAccount?.CreditAccountActive) || 0,
      closedAccount: parseInt(creditAccount?.CreditAccountClosed) || 0,
      currentBalance: parseInt(balance?.Outstanding_Balance_All) || 0,
      securedBalance: parseInt(balance?.Outstanding_Balance_Secured) || 0,
      unsecuredBalance: parseInt(balance?.Outstanding_Balance_UnSecured) || 0,
      last7DaysCredit:
        parseInt(
          result?.INProfileResponse?.TotalCAPS_Summary?.TotalCAPSLast7Days
        ) || 0,
    };

    const accounts =
      result?.INProfileResponse?.CAIS_Account?.CAIS_Account_DETAILS;
    const accountInformation = Array.isArray(accounts)
      ? accounts.map((account) => {
          const addressDetails = account?.CAIS_Holder_Address_Details || {};

          return {
            creditCard: account?.Account_Type || "Unknown",
            bankOfCreditCard: account?.Subscriber_Name || "Unknown",
            address: {
              street:
                addressDetails?.First_Line_Of_Address_non_normalized ||
                "Unknown",
              city: addressDetails?.City_non_normalized || "Unknown",
              state: addressDetails?.State_non_normalized || "Unknown",
              postalCode:
                addressDetails?.ZIP_Postal_Code_non_normalized || "Unknown",
            },
            accountNumber: account?.Account_Number || "Unknown",
            amountOverdue: parseInt(account?.Amount_Past_Due) || 0,
            currentBalance: parseInt(account?.Current_Balance) || 0,
          };
        })
      : [];

  
    const newCreditReport = new Credit({
      basicDetails: {
        name: `${profile?.First_Name || "Unknown"} ${
          profile?.Last_Name || "Unknown"
        }`,
        mobilePhone: profile?.MobilePhoneNumber || "Unknown",
        pan: pan,
        creditScore: score,
      },
      reportSummary,
      accountInformation,
    });

    await newCreditReport.save();
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: " XML processed successfully",
      data: newCreditReport,
    });
  } catch (error) {
    res.status(500).json({ message: " Server Error", error: error.message });
  }
};
