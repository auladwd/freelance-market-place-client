import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import JobCard from '../../components/JobCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';
import imge1 from '../../assets/web-development.png';
import imge2 from '../../assets/content-strategy.png';
import imge3 from '../../assets/graphic-design.png';
import imge4 from '../../assets/content-writing.png';

const Home = () => {
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await api.get('/latest-jobs');
        setLatestJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-outline  btn-sm "
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <Banner />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Latest Jobs</h2>
        {loading ? (
          <LoadingSpinner />
        ) : latestJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestJobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
        <br />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className=" flex flex-col justify-center items-center gap-2 p-4 rounded-lg bg-base-200 text-center hover:shadow-md transition">
            <img className="w-12 h-12" src={imge1} alt="" />
            <h1>Web Development</h1>
          </div>

          <div className=" flex flex-col justify-center items-center gap-2 p-4 rounded-lg bg-base-200 text-center hover:shadow-md transition">
            <img className="w-12 h-12" src={imge2} alt="" />
            <h1>Digital Marketing</h1>
          </div>

          <div className=" flex flex-col justify-center items-center gap-2 p-4 rounded-lg bg-base-200 text-center hover:shadow-md transition">
            <img className="w-12 h-12" src={imge3} alt="" />
            <h1>Graphics Designing</h1>
          </div>

          <div className=" flex flex-col justify-center items-center gap-2 p-4 rounded-lg bg-base-200 text-center hover:shadow-md transition">
            <img className="w-12 h-12" src={imge4} alt="" />
            <h1>Content Writing</h1>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">About Freelance MarketPlace</h2>
        <br />
        <p className="text-gray-600 text-justify">
          Freelance MarketPlace is a simple platform where clients can post jobs
          and freelancers can accept tasks to work on. This project demonstrates
          full-stack MERN development with Firebase authentication, MongoDB
          Atlas, and secure API integration.
        </p>
      </section>
    </div>
  );
};

export default Home;
