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

const Team = ({ teamRef, hideSocials = false }) => {
  const navigate = useNavigate();

  // make sure we don't shadow the staticTeam
  const { data: teamData = [], isLoading, isFetching, error } = useTeam();

  // prefer API; fallback to static if empty
  // prefer API; fallback to static if empty
  let allTeam = teamData?.length ? [...teamData] : [...staticTeam];

  // Define Brandi Martinez
  const brandi = {
    _id: "brandi-martinez", 
    name: "Brandi Martinez",
    designation: "Sales Support | Operations",
    email: "brandi@masonamelia.com",
    phone: "(210) 954-6022",
    address: "SAN ANTONIO, TX", // Matching typical location or leave blank
    image: "/images/team/brandi.png",
  };

  // Define desired order
  const desiredOrder = [
    "Jesse Adams",
    "Melissa Patterson",
    "Donny Gabriel",
    "Peyton Lindbloom",
    "Carlos Lopez",
    "Tom Donaldson",
    "Melissa Adams",
    "Brandi Martinez"
  ];

  // Rename Meet Donny -> Donny Gabriel
  allTeam = allTeam.map(m => 
    (m.name?.trim().toLowerCase() === "meet donny") ? { ...m, name: "Donny Gabriel" } : m
  );

  // Add Brandi if not present
  if (allTeam.length > 0 && !allTeam.find(m => m.name === "Brandi Martinez")) {
    allTeam.push(brandi);
  }

  // Filter out Nick Buccellato
  allTeam = allTeam.filter((member) => member?.name !== "Nick Buccellato");

  // Sort based on order
  const team = allTeam.sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.name);
    const indexB = desiredOrder.indexOf(b.name);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

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
        className="text-white pt-20 pb-20 md:pb-20 px-4 md:px-10"
      >
        <div className="container mx-auto" ref={teamRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={`rest-${idx}`}
                className="relative team-card rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
                <div className="absolute -bottom-[30px] md:-bottom-[5px] left-0 right-0 rounded-[100px] h-[150px] lg:h-[95px] group-hover:h-[220px] transition-all duration-500">
                  <div
                    className="glass-container flex items-center justify-center glass-container--rounded px-4 pt-2 pb-3"
                    style={{ borderRadius: "0" }}
                  >
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content glass-content--inline justify-center">
                      <div className="relative w-full pt-0 pb-1 px-2">
                        <h2 className="block text-lg md:text-xl xl:text-2xl font-semibold text-white">
                          {member?.name}
                        </h2>
                        <h4 className="block pt-1 pb-1 text-xs font-light text-white">
                          {member?.designation || "Owner"}
                        </h4>
                        <p className="text-sm text-gray-400">{member?.address}</p>
                        <div className="pt-2 pb-4 social-icons flex flex-col items-center gap-2 justify-center">
                          {!hideSocials && (
                            <div className="flex items-center gap-4 justify-center">
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
                          )}
                          
                          {/* Reveal on hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1 mt-2">
                             {member?.phone && (
                               <a href={`tel:${member.phone}`} className="text-xs text-gray-300 hover:text-white transition">
                                 {member.phone}
                               </a>
                             )}
                             {member?.email && (
                               <a href={`mailto:${member.email}`} className="text-xs text-gray-300 hover:text-white transition">
                                 {member.email}
                               </a>
                             )}
                             <Link to={`/team/${member?._id}`} className="text-xs text-tertiary_color hover:text-white transition mt-1 font-semibold underline underline-offset-4">
                               View Bio
                             </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
