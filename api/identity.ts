import api from "./axiosInstance";

export type BilingualText = {
  ar: string;
  en: string;
};

export type IdentityName = {
  english?: string;
  arabic?: string;
  en?: string;
  ar?: string;
};

export type IdentityRawPayload = {
  success?: boolean;
  operationId?: string;
  civilId?: string;
  name?: IdentityName;
  [key: string]: unknown;
};

export type StartIdentityPayload = {
  civilId: string;
  callbackUrl?: string;
  serviceName?: BilingualText;
  reason?: BilingualText;
};

export type StartIdentityResponse = {
  operationId: string | null;
  status?: "pending" | "verified" | "not_verified";
  verified?: boolean | null;
  skippedStart?: boolean;
  dataSource?: "data" | "start";
  paciRequestId?: string | null;
  statusUrl?: string | null;
  callbackUrl?: string;
  civilId?: string;
  raw?: IdentityRawPayload;
};

export type IdentityStatusResponse = {
  operationId: string;
  status: "pending" | "verified" | "not_verified";
  verified: boolean | null;
  personName?: IdentityName;
  civilId?: string | null;
  identityData?: IdentityRawPayload | null;
  callbackReceived?: boolean;
  updatedAt?: string | null;
};

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const startIdentityVerification = async (payload: StartIdentityPayload): Promise<StartIdentityResponse> => {
  // MOCK: For testing with specific National ID
  if (payload.civilId === "284102401152") {
    return {
      operationId: null,
      status: "verified",
      verified: true,
      skippedStart: true,
      dataSource: "data",
      civilId: "284102401152",
      raw: {
        name: {
          english: "YEHIA KHAFAJA",
          arabic: "يحيى عفيف حسين خفاجه"
        },
        nameParts: null,
        sex: "M",
        dateOfBirth: "1984-10-24T00:00:00",
        nationality: {
          iso3Letter: "LBN",
          iso2Letter: "LB",
          name: {
            english: "Lebanon",
            arabic: "لبنان"
          },
          demonym: {
            english: "Lebanese",
            arabic: "لبناني"
          }
        },
        bloodType: "A+",
        address: {
          uniqueKey: null,
          governorate: null,
          area: null,
          block: null,
          street: null,
          building: null,
          unitType: null,
          unitNumber: null,
          floor: null
        },
        registration: {
          cardSerialNumber: null,
          chipSerialNumber: null,
          passport: "RL 4291562",
          passportIssuer: null,
          issued: null,
          expires: "2026-07-02T00:00:00",
          documentNumber: null,
          residence: null
        },
        contacts: null,
        signature: null,
        images: null,
        operationId: "2zegvw6nqv",
        reference: null,
        uniqueId: null,
        civilId: "284102401152",
        success: true,
        timestamp: "2026-04-30T08:46:11.8964631+03:00",
        paciRequestId: "b6398c0a-f6e7-4181-a753-fc032e6d1076",
        requestType: 1
      }
    } as any;
  }

  const response = await api.post("/api/v1/identity/start", payload);
  return (response.data as ApiEnvelope<StartIdentityResponse>)?.data;
};

export const getIdentityStatus = async (operationId: string): Promise<IdentityStatusResponse> => {
  const response = await api.get(`/api/v1/identity/status/${encodeURIComponent(operationId)}`);
  return (response.data as ApiEnvelope<IdentityStatusResponse>)?.data;
};

