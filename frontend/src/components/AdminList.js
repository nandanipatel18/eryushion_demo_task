import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmins, updateAdmin, deleteAdmin, logout } from '../redux/actions';
import '../styles/adminList.css'; 

const AdminList = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.admins);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const handleUpdate = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      dispatch(deleteAdmin(id));
    }
  };

  const handleModalClose = () => {
    setSelectedAdmin(null);
    setIsModalOpen(false);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    dispatch(updateAdmin(selectedAdmin.id, selectedAdmin));
    dispatch(logout)
    handleModalClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAdmin({ ...selectedAdmin, [name]: value });
  };

  if (!admins || admins.length === 0) {
    return <div>No Admins found.</div>; 
  }

  return (
    <div>
      <h2>Admin List</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins?.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.admin_name}</td>
              <td>{admin.admin_email}</td>
              <td>
                <button className="btn-update" onClick={() => handleUpdate(admin)}>
                  Update
                </button>
                <button className="btn-delete" onClick={() => handleDelete(admin.user_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {isModalOpen && selectedAdmin && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Admin</h3>
            <form onSubmit={handleSubmitUpdate}>
              <label>
                Name:
                <input
                  type="text"
                  name="admin_name"
                  value={selectedAdmin.admin_name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="admin_email"
                  value={selectedAdmin.admin_email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit" className="btn-save">
                Save
              </button>
              <button type="button" className="btn-cancel" onClick={handleModalClose}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminList;
