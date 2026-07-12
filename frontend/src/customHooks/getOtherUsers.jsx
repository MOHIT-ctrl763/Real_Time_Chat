import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverUrl } from "../main";
import { setOtherUsers } from "../redux/userSlice";

const GetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/others`,
          {
            withCredentials: true,
          }
        );

        dispatch(setOtherUsers(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);

  return null;
};

export default GetOtherUsers;