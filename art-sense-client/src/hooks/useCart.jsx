import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useCart = () => {
  const [axiosSecure] = useAxiosSecure(); // ✅ FIXED: Destructuring Axios instance
  const { user } = useContext(AuthContext);

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email], // Include user email to prevent caching issues
    queryFn: async () => {
      if (!user?.email) return []; // Prevent API call if user is not logged in
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run query if email exists
  });

  return [cart, refetch];
};

export default useCart;
// Compare this snippet from src/pages/Shared/PhotoItem/PhotoItem.jsx:
// import { AuthContext } from "../../../providers/AuthProvider";