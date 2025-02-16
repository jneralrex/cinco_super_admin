import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../redux/slices/usersSlice"; // Adjust import based on your file structure
import { getAllAds } from "../redux/slices/AdsSlice";

const DashBoard = () => {
  const dispatch = useDispatch();

  // Users state
  const { totalUsers, loading: usersLoading, error: usersError } = useSelector((state) => state.users);

  const { loading: adsLoading, error: adsError, ads } = useSelector((state) => state.ads);

  // Fetch the users and locations data when the component mounts
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllAds());

  }, [dispatch]);

  return (
    <div className="max-h-screen grid grid-cols-1 md:grid-cols-3 w-full gap-2 p-3 md:pt-0 pb-16 lg:pb-5">
      {/* Users Card */}
      <div className="w-full h-52 m-auto border border-red-100 justify-center flex items-center text-gray-900 bg-gray-500 hover:bg-black/80 hover:text-white">
        {usersLoading ? (
          "Loading Users..."
        ) : usersError ? (
          `Error: ${usersError}`
        ) : (
          `Total Users: ${totalUsers}`
        )}
      </div>

      {/* Ads Card */}
      <div className="w-full h-52 m-auto border border-red-100 justify-center flex items-center text-gray-900 bg-green-200 hover:bg-black/80 hover:text-white">
        {adsLoading ? (
          "Loading Ads..."
        ) : adsError ? (
          `Error: ${adsError}`
        ) : (
          `Total Ads: ${ads?.length || 0}`
        )}
      </div>
    </div>
  );
};

export default DashBoard;
