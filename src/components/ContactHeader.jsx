import React from "react";
import { motion } from "framer-motion";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";

const ContactHeader = () => {
  const media = useMediaQuery("(max-width: 1023px)");

  return (
    <div className="flex items-center h-screen">
      {/* Overlay card */}
      <div className="lg:p-8 py-8 px-2 text-white text-start">
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:text-start text-center lg:max-w-2xl lg:max-w-2xl xl:max-w-3xl text-[2rem] text-white lg:text-[2.5rem] lg:text-[3rem] xl:text-6xl font-bold mb-2"
          style={{ lineHeight: "1.1" }}
        >
          Let’s Build{" "}
          <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
            Aviation Success Together
          </span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            duration: 0.5,
            delay: 0.3,
          }}
          className="max-w-2xl flex justify-start text-center lg:text-start"
        >
          <ShinyText
            isTextCenter={media ? true : false}
            text={
              "At Mason Amelia, relationships drive aviation success. Reach out and let’s shape the right course for your journey together."
            }
            disabled={false}
            speed={5}
            className="text-base lg:text-xl mt-4"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactHeader;
