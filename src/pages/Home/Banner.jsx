import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import 'swiper/css';

const Banner = () => {
  return (
    <div className="mb-10">
      <Swiper
        loop={true}
        spaceBetween={30}
        className="rounded-xl overflow-hidden"
      >
        <SwiperSlide>
          <div className="hero min-h-[320px] bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <motion.img
                src="https://images.yourstory.com/cs/2/f02aced0d86311e98e0865c1f0fe59a2/gig-workers-1601281708308.png?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75"
                className="max-w-sm rounded-lg shadow-2xl"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <h1 className="text-3xl lg:text-4xl font-bold">
                  Reliable Freelance Marketplace for Modern Teams
                </h1>
                <motion.p
                  className="py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  Post your jobs, hire experts, and manage tasks in one place.
                </motion.p>
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <Link to="/addJob" className="btn btn-primary">
                    Create a Job
                  </Link>
                  <Link to="/allJobs" className="btn btn-outline">
                    Browse Jobs
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hero min-h-[320px] bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
              <motion.img
                src="https://seotraining.pk/cdn/shop/articles/2-960x480.jpg?v=1688574161"
                className="max-w-sm rounded-lg shadow-2xl"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <h1 className="text-3xl lg:text-4xl font-bold">
                  Connect with Top Talent Around the Globe
                </h1>
                <motion.p
                  className="py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  Thousands of professionals are ready to take your project to
                  the next level.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <Link to="/register" className="btn btn-primary">
                    Join as Client or Freelancer
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
