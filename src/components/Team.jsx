import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { useTeam } from "../hooks/useTeamQuery";
import FullscreenSpinner from "./FullScreenSpinner";

/* your existing static list */
const staticTeam = [
  /* ... same as before ... */
];

const Team = () => {
  const navigate = useNavigate();

  // make sure we don't shadow the staticTeam
  const { data: teamData = [], isLoading, isFetching, error } = useTeam();

  // prefer API; fallback to static if empty
  const team = teamData?.length ? teamData : staticTeam;

  return (
    <>
      {/* Spinner mounts into <body> via portal */}
      <FullscreenSpinner show={isLoading || isFetching} text="Loading team…" />

      {/* If API failed AND no fallback, you can show a soft message */}
      {!team.length && error && (
        <div className="py-10 text-center text-red-400">
          Failed to load team.
        </div>
      )}

      {/* Your original UI (unchanged except using `team`) */}
      <section
        id="team"
        className="text-white pt-32 pb-20 md:pb-20 md:pt-0 px-4 md:px-10"
      >
        <div className="container pt-[195px] flex items-center">
          <div className="w-full">
            {/* left glass card ... unchanged */}
            <div
              className={`w-full glass-container md:mb-0 mb-4 lg:minh-[375px] flex items-center justify-center`}
              style={{
                borderRadius: "0px",
                boxShadow:
                  "0 6px 6px rgba(0,0,0,0.02), 0 0 20px rgba(0,0,0,0.1)",
                height: "100%",
              }}
            >
              <div className="glass-filter"></div>
              <div className="glass-overlay"></div>
              <div className="glass-specular"></div>
              <div
                className="glass-content flex flex-col"
                style={{ padding: "3rem 1rem" }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[2rem] lg:text-[1.4rem] xl:text-[2rem] 2xl:text-6xl font-bold text-[#fff]"
                  style={{ lineHeight: "1.2" }}
                >
                  A Team of Pilots and{" "}
                  <span className="text-[#fff]">Aviation Experts</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-base xl:text-xl text-center px-8 mt-[30px] font-light"
                >
                  Our team combines over a century of flight experience with
                  deep market expertise, offering clients the rare advantage of
                  working with brokers who are true aviation professionals.
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* rest of team */}
        <div className="container">
          <div className="mx-auto">
            <h5 className="text-6xl font-semibold text-center my-20 md:block hidden">
              Our Team
            </h5>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div
                key={`rest-${idx}`}
                className="relative team-card rounded-xl overflow-hidden group"
              >
                <Link to={`/team/${member?._id}`}>
                  <div className="relative w-full">
                    <img
                      src={member?.profile_picture || member?.image}
                      alt={member?.name}
                      className="w-full h-[420px] object-cover"
                    />
                    <div className="transition-all duration-300 group-hover:h-[100%] absolute top-0 left-0 w-full h-0 bg-black opacity-0 lg:opacity-60 z-[0]"></div>
                  </div>
                </Link>
                <div className="absolute -bottom-[5px] left-0 right-0 rounded-[100px] h-[200px] lg:h-[160px] group-hover:h-[210px] transition-all duration-500">
                  <div
                    className="glass-container flex items-center justify-center glass-container--rounded px-4 py-3"
                    style={{ borderRadius: "0" }}
                  >
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content glass-content--inline justify-center">
                      <div className="relative w-full py-5 px-2">
                        <h3 className="text-base font-light text-gray-400 mb-4 px-3">
                          {member?.address}
                        </h3>
                        <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-white">
                          {member?.name}
                        </h2>
                        <p className="text-sm py-2 text-gray-400">
                          {member?.email}
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                          {member?.title}
                        </p>
                        <div className="social-icons flex items-center gap-4 justify-center">
                          {member?.facebook && (
                            <a href={member?.facebook} target="_blank">
                              <FaFacebook className="hover:text-[#0866ff] text-xl transition cursor-pointer" />
                            </a>
                          )}
                          {member?.twitter && (
                            <a href={member?.twitter} target="_blank">
                              <FaYoutube className="hover:text-[#ff0000] text-xl transition cursor-pointer" />
                            </a>
                          )}
                          {member?.instagram && (
                            <a href={member?.instagram} target="_blank">
                              <FaInstagram className="hover:text-[#c3407b] text-xl transition cursor-pointer" />
                            </a>
                          )}
                          {member?.linkedin && (
                            <a href={member?.linkedin} target="_blank">
                              <FaLinkedin className="hover:text-[#0a66c2] text-xl transition cursor-pointer" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
