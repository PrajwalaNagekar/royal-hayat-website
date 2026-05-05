import api from "./axiosInstance";

export type CreateAppointmentRequestPayload = {
  fullname: string;
  phone: string;
  dateOfBirth?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  additionalNotes?: string;
};

export const createAppointmentRequest = async (data: CreateAppointmentRequestPayload) => {
  const response = await api.post("/api/v1/appointment-requests", data);
  return response.data;
};
