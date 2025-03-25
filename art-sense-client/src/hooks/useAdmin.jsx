import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {

  const {user, loading} = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  
  const {  data:isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    enabled:!loading && !!user?.email,
    queryFn: async () =>{
      const response = await axiosSecure.get(`/users/admin/${user?.email}`);
      console.log('is admin response', response);
      return response.data.admin;
    },
  })
  return[isAdmin, isAdminLoading]
}

export default useAdmin;

