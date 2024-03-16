import axiosInstance from 'src/@core/lib/axios/axios'

export interface UpdateStaffI {
  email: string
  password: string
  firstName: string
  lastName: string
  permissions: { id: string }[]
}

export async function updateStaff(id: string, staffData: UpdateStaffI): Promise<any | null> {
  try {
    const response = await axiosInstance.patch(`/api/staff/update/${id}`, staffData)
    if (response.status == 200) {
      return response.data
    } else {
      console.log('Staff update failed')
      return null
    }
  } catch (error) {
    console.log('Staff update failed')
    return null
  }
}
