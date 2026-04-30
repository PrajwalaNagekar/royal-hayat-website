import api from "./axiosInstance";
export const getDoctorsByDepartment=async(department:string)=>{
    const response=await api.get(`/api/v1/doctors/department/${department}`)
    return response.data
}
export const getDoctorById=async(id:string)=>{
    const response=await api.get(`/api/v1/doctors/${id}`)
    return response.data
}
