import api from "./axiosInstance";

export const getAllDepartments=async()=>{
    const response=await api.get("/api/v1/departments")
    return response.data
}

export const getDepartmentById=async(id:string)=>{
    const response=await api.get(`/api/v1/departments/${id}`)
    return response.data
}

export const getDoctorsByDepartment=async(department:string)=>{
    const response=await api.get(`/api/v1/doctors/department/${department}`)
    return response.data
}
