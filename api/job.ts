import api from "./axiosInstance";

export type JobPosting = {
    _id?: string;
    id?: string | number;
    title: string;
    category?: string;
    location?: string;
    type?: string;
    desc?: string;
    description?: string;
    responsibilities?: string[];
    requirements?: string[];
    date?: string;
    [key: string]: unknown;
};

export type JobApplicationPayload = {
    jobId: string;
    fullName: string;
    email: string;
    phone: string;
    coverLetter?: string;
    cv?: File;
};

export const getAllJobs = async () => {
    console.log("getAllJobs----api called");
    const response = await api.get("/api/v1/jobs");
    const data = response.data.data;
    return Array.isArray(data) ? data : ([]);
};

export const getJobById = async (id: string) => {
    const response = await api.get(`/api/v1/jobs/${id}`);
    return response.data?.data ?? response.data?.job ?? response.data;
};

export const applyForJob = async (data: JobApplicationPayload) => {
    const formData = new FormData();
    formData.append("jobId", data.jobId);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
   if(data.coverLetter) formData.append("coverLetter",data.coverLetter );
    if (data.cv) formData.append("cv", data.cv);

    const response = await api.post("/api/v1/jobs/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};