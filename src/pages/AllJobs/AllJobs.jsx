import React, { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import JobCard from '../../components/JobCard';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const sortedJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    const copy = [...jobs];
    const getDate = job => {
      return new Date(
        job.created_at || job.createdAt || job.date || job.postedAt || null
      );
    };

    copy.sort((a, b) => {
      const da = getDate(a);
      const db = getDate(b);

      if (isNaN(da) && isNaN(db)) return 0;
      if (isNaN(da)) return sortOrder === 'newest' ? 1 : -1;
      if (isNaN(db)) return sortOrder === 'newest' ? -1 : 1;

      return sortOrder === 'newest' ? db - da : da - db;
    });

    return copy;
  }, [jobs, sortOrder]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">All Jobs</h1>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 font-bold">Sort:</label>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="select select-bordered select-sm"
            aria-label="Sort jobs by posted date"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      {sortedJobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedJobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
