import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const { _id, title, category, summary, coverImage, postedBy } = job;
  // JobCard component JSX
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition border">
      <figure className="h-48 w-full overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-400 mb-1">
          Category: <span className="font-semibold">{category}</span>
        </p>
        <p className="text-sm text-gray-600 line-clamp-3">{summary}</p>
        <div className="mt-3 flex justify-between items-center text-xs">
          <span className="text-gray-500">Posted by: {postedBy}</span>
          <Link to={`/allJobs/${_id}`} className="btn btn-sm btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
