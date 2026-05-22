import api from "./axiosInstance";


// ================= CREATE FEEDBACK =================

export type CreateHospitalFeedbackPayload = {
  userName?: string;
  arabicUserName?: string;

  feedback?: string;
  arabicFeedback?: string;

  stars: number;
};

export const createHospitalFeedback = async (
  data: CreateHospitalFeedbackPayload
) => {

  const response = await api.post(
    "/api/v1/hsopital-feedback/create",
    data
  );

  return response.data;
};


// ================= GET ENGLISH FEEDBACKS =================

export const getEnglishHospitalFeedbacks = async () => {

  const response = await api.get(
    "/api/v1/hsopital-feedback/english"
  );

  return response.data;
};


// ================= GET ARABIC FEEDBACKS =================

export const getArabicHospitalFeedbacks = async () => {

  const response = await api.get(
    "/api/v1/hsopital-feedback/arabic"
  );

  return response.data;
};