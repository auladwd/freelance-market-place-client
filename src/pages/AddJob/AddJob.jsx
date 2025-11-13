import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddJob = async e => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const summary = form.summary.value;
    const coverImage = form.coverImage.value;

    const newJob = {
      title,
      category,
      summary,
      coverImage,
      postedBy: user.displayName || 'Anonymous',

      email: user.email,
      userEmail: user.email,
      created_at: new Date().toISOString(),
      status: 'open',
    };

    try {
      const res = await api.post('/jobs', newJob);
      if (res.data?.success) {
        toast.success('Job added successfully!');
        form.reset();
        navigate('/myAddedJobs');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add job!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Add a New Job</h1>
      <form
        onSubmit={handleAddJob}
        className="space-y-4 bg-base-200 p-6 rounded-xl"
      >
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            name="title"
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
            type="url"
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
