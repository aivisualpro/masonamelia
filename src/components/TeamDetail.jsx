import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useMemberDetail } from "../hooks/useMemberDetailQuery";
import FullscreenSpinner from "./FullscreenSpinner";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const TeamDetail = () => {
  const { id } = useParams(); // /team/:id
  const { data: m, isLoading, isFetching, error } = useMemberDetail(id);

  return (
    <>
      <FullscreenSpinner
        show={isLoading || isFetching}
        text="Loading member…"
      />

      {error && (
        <section className="text-white py-20 md:px-10">
          <div className="text-center text-red-400">Failed to load member.</div>
        </section>
      )}

      {!m ? null : (
        <section className="text-white py-20 md:px-10">
          <div className="glass-container flex items-center glass-container--rounded px-4 py-3">
            <div className="glass-filter"></div>
            <div className="glass-overlay"></div>
            <div className="glass-specular"></div>

            <div className="glass-content glass-content--inline">
              <div className="text-white p-6 rounded-xl mx-auto flex flex-col gap-6 items-start">
                <div className="flex justify-start flex-col md:flex-row w-full gap-8">
                  {/* Image */}
                  <motion.div
                    className="w-full md:w-[40%]"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", duration: 1 }}
                  >
                    <img
                      src={m?.profile_picture}
                      alt={m?.name}
                      className="object-cover rounded-lg border border-gray-700 w-full h-auto"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Text Content */}
                  <motion.div
                    className="text-start flex flex-col w-full md:w-[60%]"
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", duration: 1 }}
                  >
                    <h2 className="text-5xl md:text-6xl text-tertiary_color font-bold">
                      {m?.name}
                    </h2>
                    <p className="text-2xl text-gray-300 font-medium mb-8 mt-4">
                      {m?.designation || m?.title}
                    </p>

                    {/* Contact */}
                    <motion.div
                      className="flex flex-col justify-center gap-4 text-sm text-gray-400 mb-4"
                      initial={{ y: 40, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    >
                      {!!m?.phone && (
                        <a href={`tel:${m.phone}`}>
                          <div className="flex items-center gap-1 mb-4">
                            <FaPhone size={22} />
                            <span className="ms-2 text-lg">{m.phone}</span>
                          </div>
                        </a>
                      )}
                      {!!m?.email && (
                        <a href={`mailto:${m.email}`}>
                          <div className="flex items-center gap-1">
                            <AiOutlineMail size={22} />
                            <span className="ms-2 text-lg">{m.email}</span>
                          </div>
                        </a>
                      )}

                      <div className="social-icons flex items-center gap-4 mt-8">
                        {
                          !!m?.facebook && (
                            <a href={m?.facebook} target="_blank">
                              <FaFacebook className="hover:text-[#0866ff] text-3xl transition cursor-pointer" />
                            </a>
                          )
                        }
                        {
                          !!m?.youtube && (
                            <a href={m?.youtube} target="_blank">
                              <FaYoutube className="hover:text-[#ff0000] text-3xl transition cursor-pointer" />
                            </a>
                          )
                        } 
                        {
                          !!m?.instagram && (
                            <a href={m?.instagram} target="_blank">
                              <FaInstagram className="hover:text-[#c3407b] text-3xl transition cursor-pointer" />
                            </a>
                          )
                        }
                        {
                          !!m?.linkedin && (
                            <a href={m?.linkedin} target="_blank">
                              <FaLinkedin className="hover:text-[#0a66c2] text-3xl transition cursor-pointer" />
                            </a>
                          )
                        }
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Description (server returns HTML) */}
                {!!m?.description && (
                  <div className="text-start prose prose-invert max-w-none">
                    {/* If you want sanitization, add DOMPurify; for now we trust backend */}
                    <div dangerouslySetInnerHTML={{ __html: m.description }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TeamDetail;
