import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.result || res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleAcceptJob = async () => {
    if (!user) {
      return toast.error('You must be logged in to accept a job!');
    }

    if (job?.postedBy && user?.email && job.postedBy === user.email) {
      return toast.error('You cannot accept a job you posted.');
    }

    try {
      const res = await api.put(`/jobs/accept/${id}`, {
        acceptedBy: user.email,
        status: 'accepted',
      });
      if (res.data?.success || res.status === 200) {
        toast.success('Job accepted successfully!');
        navigate('/my-accepted-tasks');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to accept job!');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!job) return <p className="text-center mt-10">Job not found</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-base-100 shadow-lg rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={job.coverImage}
            alt={job.title}
            className="w-full md:w-1/3 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <p className="text-sm text-gray-500 mb-2">
              Category: <span className="font-semibold">{job.category}</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Posted by: <span className="font-semibold">{job.postedBy}</span>
            </p>
            <p className="text-gray-700 mb-4">{job.summary}</p>
            <p className="text-xs text-gray-400">
              Status:{' '}
              <span className="font-semibold capitalize">
                {job.status || 'open'}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-end gap-2">
          {/* show message when this is the user's own job */}
          {user?.email && job?.postedBy && job.postedBy === user.email && (
            <p className="text-sm text-red-500">
              You cannot accept a job you posted.
            </p>
          )}
          <div className="w-full md:w-auto flex justify-end">
            <button
              onClick={handleAcceptJob}
              className={`btn btn-primary ${
                !user ||
                job?.status === 'accepted' ||
                (user?.email && job?.postedBy === user.email)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={
                !user ||
                job?.status === 'accepted' ||
                (user?.email && job?.postedBy === user.email)
              }
            >
              {job?.status === 'accepted' ? 'Already Accepted' : 'Accept Job'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
