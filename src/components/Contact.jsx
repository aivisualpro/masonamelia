import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import contactBanner from "/images/contact.avif";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PiOfficeChair } from "react-icons/pi";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "f51d25fc-3e7c-4679-a0e1-4b8bfd06136a";

const Contact = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ type: "", msg: "" });

    try {
      const phone = formData.phone?.trim();
      const normalizedPhone =
        phone?.startsWith("+") || !phone ? phone : `+${phone}`;

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY, // 👉 recipient = sagheer@skynetsilicon.com (per access key)
        name: formData.name,
        email: formData.email, // visitor email (reply-to)
        replyto: formData.email,
        subject: formData.subject || "Website Contact",
        phone: normalizedPhone || "",
        message: formData.message,
        // (Optional PRO): ccemail: "sales@skynetsilicon.com",
      };

      const resp = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await resp.json();

      if (json?.success) {
        setToast({
          type: "success",
          msg: "Thanks! Your message has been sent.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          phone: "",
          message: "",
        });
      } else {
        setToast({ type: "error", msg: json?.message || "Failed to send." });
      }
    } catch (err) {
      setToast({ type: "error", msg: err.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        className={`relative w-full z-[1] ${location.pathname !== "/contact"
          ? "lg:h/full 2xl:h-full"
          : "2xl:h-full"
          } flex items-center`}
        style={{
          backgroundImage:
            location.pathname !== "/contact" ? `url(${contactBanner})` : "none",
          backgroundSize: location.pathname !== "/contact" ? "cover" : "",
          backgroundPosition: location.pathname !== "/contact" ? "center" : "",
          backgroundAttachment: "fixed",
          backgroundRepeat: location.pathname !== "/contact" ? "no-repeat" : "",
        }}
      >
        {location.pathname !== "/contact" && (
          <div className="absolute top-0 left-0 w-full h-full bg-[#111218] opacity-95 z-[0]" />
        )}

        <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left */}
          <div
            className={`relative rounded-2xl shadow-md lg:h-auto h-[425px] ${location.pathname === "/contact" && isMobile ? "mt-[15vh]" : ""
              }`}
          >
            <div
              className="liquid-glass flex flex-col justify-center"
              style={{ padding: "20px 40px" }}
            >
              <div className="liquid-glass--bend" />
              <div className="liquid-glass--face" />
              <div className="liquid-glass--edge" />
              <div className="relative rounded-xl flex flex-col md:justify-around lg:py-0 py-4 h-full w-full">
                <div>
                  <h2 className="text-4xl font-bold mb-2 text-white">
                    Contact Us
                  </h2>
                  {/* <p className="mb-6 text-sm text-gray-200">
                    Say something to start a live chat!
                  </p> */}

                  <div className="flex items-center gap-3 pt-4 text-white">
                    <FaEnvelope className="text-lg" />
                    <a href="mailto:info@masonamelia.com">
                      info@masonamelia.com
                    </a>
                  </div>
                  <div className="flex gap-3 my-6 text-white">
                    <PiOfficeChair className="text-3xl md:text-lg mt-1" />
                    <div className="principal-office">
                      <h6 className="font-medium mb-1">PRINCIPAL OFFICE:</h6>
                      <address className="text-[.9rem]">
                        322 Boerne Stage Airfield Boerne, Texas 78006
                      </address>
                    </div>
                  </div>
                  <div className="flex gap-3 text-white">
                    <FaMapMarkerAlt className="text-lg mt-1" />
                    <div className="locations">
                      <h6 className="font-medium mb-1">LOCATIONS:</h6>
                      <span className="max-w-sm text-[.9rem]">
                        Birmingham, AL <br /> Duluth, MN <br /> San Antonio, TX{" "}
                        <br /> Scottsdale, AZ <br /> Upstate, NY
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <a
                    href="https://www.linkedin.com/company/masonamelia/"
                    target="_blank"
                  >
                    {/* <FaLinkedinIn
                      size={24}
                      className="text-white hover:text-blue-400 cursor-pointer transition"
                    /> */}
                  </a>
                  <a
                    href="https://www.facebook.com/masonamelia.aviation"
                    target="_blank"
                  >
                    {/* <FaFacebookF
                      size={24}
                      className="text-white hover:text-blue-400 cursor-pointer transition"
                    /> */}
                  </a>
                  <a
                    href="https://www.instagram.com/masonamelia.aircraftsales/"
                    target="_blank"
                  >
                    {/* <FaInstagram
                      size={24}
                      className="text-white hover:text-pink-400 cursor-pointer transition"
                    /> */}
                  </a>
                  <a
                    href="https://www.youtube.com/c/lookingforhigher"
                    target="_blank"
                  >
                    {/* <FaYoutube
                      size={24}
                      className="text-white hover:text-red-500 cursor-pointer transition"
                    /> */}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-transparent bg-opacity-40 rounded-2xl z-[2]">
            {/* status message */}
            {toast.msg && (
              <div
                className={`mb-4 rounded-lg px-4 py-3 text-sm ${toast.type === "success"
                  ? "bg-green-600/20 text-green-200 border border-green-500/40"
                  : "bg-red-600/20 text-red-200 border border-red-500/40"
                  }`}
              >
                {toast.msg}
              </div>
            )}

            <form
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              <div className="md:col-span-2">
                <label className="text-sm text-white mb-2 inline-block">
                  First name:
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 text-white focus:outline-none bg-transparent border border-gray-600 rounded-lg mt-1"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-white mb-2 inline-block">
                  Phone:
                </label>
                <input
                  type="tel"
                  className="w-full p-3 text-white focus:outline-none bg-transparent border border-gray-600 rounded-lg mt-1"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-white mb-2 inline-block">
                  Email:
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-3 text-white focus:outline-none bg-transparent border border-gray-600 rounded-lg mt-1"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-white mb-2 inline-block">
                  Subject:
                </label>
                <input
                  type="text"
                  className="w-full p-3 text-white focus:outline-none bg-transparent border border-gray-600 rounded-lg mt-1"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-white mb-2 inline-block">
                  Message:
                </label>
                <textarea
                  required
                  className="w-full p-3 text-white focus:outline-none bg-transparent border border-gray-600 rounded-lg mt-1"
                  rows="4"
                  placeholder="Write your message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2 text-right">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-[#111218] disabled:opacity-60 flex gap-2 items-center shadow-xl text-sm md:text-lg bg-[#fff] backdrop-blur-md lg:font-medium isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-tertiary_color hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 md:px-4 py-1 md:py-2 overflow-hidden border-2 border-[#111218] transition-all duration-700 hover:border-tertiary_color rounded-full group"
                >
                  {loading ? "Sending…" : "Send"}
                  <svg
                    className="w-5 h-5 md:w-8 md:h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-[#fff] ease-linear duration-300 rounded-full border border-[#111218] group-hover:border-none md:p-2 p-1 rotate-45"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      className="fill-gray-800 group-hover:fill-gray-800"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
