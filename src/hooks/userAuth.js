import { useSelector } from "react-redux";
import {
  selectUserEmail,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectIsRegistered,
  selectToken,
} from "../redux/auth/selectors.js";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isRegistered = useSelector(selectIsRegistered);
  const user = useSelector(selectUserEmail);
  const token = useSelector(selectToken);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    isRegistered,
    token,
  };
};
