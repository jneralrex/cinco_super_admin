import AddTheatreAdmin from "../components/globalController/triggers/AddTheatreAdmin";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteUser, viewSelectedUser } from "../redux/slices/usersSlice";
import EditUser from "../components/globalController/forms/EditUser";
import { encryptId } from "../utils/Crypto";
import SingleUserModal from "../components/globalController/SingleUserModal";
import { deleteCinema, getAllCinema, viewSelectedCinema } from "../redux/slices/CinemaSlice";
import SingleCinema from "../components/globalController/SingleCinema";

const TheatreAdminManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, cinemas, currentPage, totalPages } = useSelector(
    (state) => state.cinema
  );
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); 
  const [viewCinemaDetails, setViewCinemaDetails] = useState(null);

  useEffect(() => {
    dispatch(getAllCinema({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(getAllCinema({ page, limit: 10 }));
    }
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const encryptedId = encryptId(userId);
      dispatch(deleteCinema({ userId: encryptedId, page: currentPage, limit: 10 }))
        .unwrap()
        .then(() => {
          dispatch(getAllCinema({ page: currentPage, limit: 10 }));
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
        });
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true); 
  };

  const handleViewUser = (userId) => {
    const encryptedId = encryptId(userId);
    dispatch(viewSelectedCinema(encryptedId))
      .unwrap()
      .then((userDetails) => {
        setViewCinemaDetails(userDetails); 
        setIsViewModalOpen(true); 
      })
      .catch((err) => {
        console.error("Error viewing user:", err);
      });
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewUserDetails(null);
  };
  return (
    <div className="max-h-screen w-full  pt-2 pb-20 lg:pb-20">
      <div className="flex flex-row items-center justify-between w-[90%] m-auto">
        <AddTheatreAdmin />
        <div className="text-center text-xl font-bold mb-4">
          Admin Management
        </div>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : cinemas.length > 0 ? (
        <>
          <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cinemas.map((cinema) => (
                <tr key={cinema._id} className="hover:bg-gray-100">
                  <td className="p-2 border">{cinema.cinemaName || "N/A"}</td>
                  <td className="p-2 border">{cinema.cinemaEmail || "N/A"}</td>
                  <td className="p-2 border">{cinema.cinemaPhoneNumber || "N/A"}</td>
                  {/* <td className="p-2 border">{cinema.role || "N/A"}</td> */}
                  <td className="p-2 border">
                    <select
                      className="border p-1"
                      onChange={(e) => {
                        if (e.target.value === "edit") {
                          handleEditUser(cinema);
                        }
                        if (e.target.value === "delete") {
                          handleDeleteUser(cinema._id); 
                        }
                        if (e.target.value === "view") {
                          handleViewUser(cinema._id); 
                        }
                      }}
                    >
                      <option value="">Select Action</option>
                      <option value="edit">Edit</option>
                      <option value="delete">Delete</option>
                      <option value="view">View</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-gray-300 text-white rounded-md"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-300 text-white rounded-md"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Edit User Modal */}
          <EditUser
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            user={selectedUser}
          />

          {/* View Selected User Modal */}
          {isViewModalOpen && viewCinemaDetails && (
            <SingleCinema
            cinema={viewCinemaDetails}
              onClose={closeViewModal}
            />
          )}
        </>
      ) : (
        <p className="text-center">No users available.</p>
      )}
    </div>
  );
}

export default TheatreAdminManagement;
