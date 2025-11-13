import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyAddedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const email = encodeURIComponent(user.email);
        const res = await api.get(`/my-jobs?email=${email}`);
        setJobs(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load your jobs');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return api
          .delete(`/jobs/${id}`)
          .then(res => {
            if (!res.data?.success) {
              throw new Error(res.data?.message || 'Delete failed');
            }
            return res.data;
          })
          .catch(err => {
            Swal.showValidationMessage(`Request failed: ${err.message || err}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.isConfirmed) {
        toast.success('Job deleted!');
        setJobs(prev => prev.filter(job => job._id !== id));
      }
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">My Added Jobs</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't added any jobs yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Summary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.category}</td>
                  <td className="max-w-xs truncate">{job.summary}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/updateJob/${job._id}`}
                      className="btn btn-xs btn-outline"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAddedJobs;
