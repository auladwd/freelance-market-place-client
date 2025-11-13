import React, { useContext, useEffect, useState } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAccepted = async () => {
    try {
      const res = await api.get('/jobs');
      const allJobs = res.data;
      const myTasks = allJobs.filter(
        j => j.status === 'accepted' && j.acceptedBy === user.email
      );
      setTasks(myTasks);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load accepted tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchAccepted();
  }, [user]);

  const handleDoneOrCancel = async (id, action) => {
    try {
      if (action === 'DONE') {
        // done হলে status = "done"
        await api.put(`/jobs/${id}`, { status: 'done' });
        toast.success('Task marked as done');
      } else {
        await api.put(`/jobs/${id}`, { status: 'open', acceptedBy: null });
        toast.success('Task canceled');
      }
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Failed to update task');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">My Accepted Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't accepted any tasks yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <div key={task._id} className="card bg-base-100 shadow-md border">
              <div className="card-body">
                <h2 className="card-title text-lg">{task.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Category: {task.category}
                </p>
                <p className="text-sm text-gray-600 mb-4">{task.summary}</p>
                <div className="flex justify-between items-center gap-2">
                  <button
                    onClick={() => handleDoneOrCancel(task._id, 'DONE')}
                    className="btn btn-sm btn-success text-white"
                  >
                    ✅ Done
                  </button>
                  <button
                    onClick={() => handleDoneOrCancel(task._id, 'CANCEL')}
                    className="btn btn-sm btn-error text-white"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAcceptedTasks;
