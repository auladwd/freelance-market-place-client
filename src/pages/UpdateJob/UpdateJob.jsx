import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.result || res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load job');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleUpdate = async e => {
    e.preventDefault();
    if (!job) return;
    const form = e.target;
    const updated = {
      title: form.title.value,
      category: form.category.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,

      postedBy: job.postedBy || (user && user.displayName) || 'Anonymous',
      email: job.email || (user && user.email),
      userEmail: job.userEmail || (user && user.email),
    };

    try {
      const res = await api.put(`/jobs/${id}`, updated);
      if (res.data?.success || res.status === 200) {
        toast.success('Job updated successfully');
        navigate('/myAddedJobs');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update job');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!job) return <p className="text-center mt-10">Job not found</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Job</h1>
      <form
        onSubmit={handleUpdate}
        className="space-y-4 bg-base-200 p-6 rounded-xl"
      >
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            name="title"
            defaultValue={job.title}
            type="text"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            name="category"
            defaultValue={job.category}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Category</option>
            <option>Web Development</option>
            <option>Digital Marketing</option>
            <option>Graphics Designing</option>
            <option>Content Writing</option>
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Summary</span>
          </label>
          <textarea
            name="summary"
            defaultValue={job.summary}
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Cover Image URL (imgbb)</span>
          </label>
          <input
            name="coverImage"
            defaultValue={job.coverImage}
            type="url"
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
