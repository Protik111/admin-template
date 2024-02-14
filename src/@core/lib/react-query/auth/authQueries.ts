import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
  } from "react-query";
import { QUERY_KEYS } from "../queryKeys";
import { authService } from "src/@core/services/auth/authService";
import { User } from "src/@core/services/auth/useUser";

//auth queries
export const userSignIn = () => {
  const queryClient = useQueryClient()
    return useMutation<User, unknown, { email: string; password: string }, unknown>(
      ({ email, password }) => {
          return authService.signIn(email, password)
          }
    )
}