import React from "react";
import InfiniteMovingCards from "../components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    review:
      "I've been here a few times in the past couple years. It's addicting. This place is great for shooting guns. Shotguns specifically. I like it a lot and the service is great. Also the BBQ is to die for. So delicious. Go there. It's fun.",
    name: "Jim Work, Cirrus N319PW",
    location: "Piston Brokerage ",
  },
  {
    id: 2,
    review:
      "Where do I start? My girlfriend & I are complete shotgun novices. We arrived (following a ringing endorsement from a friend) and Irene took us under her wing. What an amazing person, a credit to her profession. She walked us through the different type of guns, ammunition, how to carry everything correctly. She was patient, personable and just good fun. Not only would I recommend her and this place to anyone to try, I already have! We'll be back! PS: training coordinator Ron is another funny & amazing guy. Organizing this from the very off was a breeze and so much fun...before we even got to the course!!",
    name: "Bernie Abbott, Meridian N142EE",
    location: "Turbine Brokerage",
  },
  {
    id: 3,
    review:
      "I've been here a few times in the past couple years. It's addicting. This place is great for shooting guns. Shotguns specifically. I like it a lot and the service is great. Also the BBQ is to die for. So delicious. Go there. It's fun.",
    name: "Tom Chapman, Cirrus N854SR",
    location: "Piston Brokerage",
  },
  {
    id: 4,
    review:
      "Great experience! We are first time learners and our instructor Irene is awesome! She doesn’t just tell you to do this or that, she tells you why we do this and teaches you how to do it right. With her help I had some great shots.",
    name: "JErnest Lugo, Meridian N995S",
    location: "Turbine Acquisition",
  },
  {
    id: 5,
    review:
      "This place is awesome. It's in a private valley and is very beautiful. These setups for each shoot we're great. Prices are reasonable. The family and our friends had a blast. Just make sure to get there early. After 11am on the weekends it gets busy and you may have to wait at the stands. We got there before 9 and had no waiting before 11.",
    name: "Keith Mann, Cirrus N963CD",
    location: "Piston Acquisition",
  },
  {
    id: 6,
    review:
      "Trust Skynet Silicon to revolutionize your digital strategy. This digital agency is synonymous with quality, merging modern technology with creative solutions. Their dedication to excellence shines through every project, ensuring your digital journey is smooth and innovative.",
    name: "Fernando Donatti, Cirrus N400EJ",
    location: "Piston Brokerage/Acquisition",
  },
  {
    id: 7,
    review:
      "What a hidden playground. Yes this place is so much fun. Driving in golf carts shooting guns! It is like golf going hole to hole only you shoot with a shotgun. Each station on the main course is different. There are traditional trap and skeet as well. A variety of areas to test your skills. You can rent guns, get snacks and drinks there even beer. So go and enjoy a day outdoors blasting away. Bring a camera as well great sights to photograph.",
    name: "Matt Wright, Cirrus N11MU",
    location: "Piston Brokerage",
  },
];

const Reviews = () => {

  const location = useLocation();

  return (
    <>
      <section id="testimonials" className={`py-10 ${location.pathname === "/testimonial" ? "xl:h-[100vh]" : "xl:h-[100vh]"}  flex flex-col justify-center`}>
        <div className="container px-5 mb-14 z-[20]">
          <div className="text-center">
            <motion.h5
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-6xl text-[#fff] font-bold max-w-3xl mx-auto"
            >
              Clients Across World
            </motion.h5>
            <motion.p
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-[#ddd] md:text-lg py-[40px] mx-auto max-w-4xl"
            >
              Real voices. Real experiences. Hear how our clients turned
              aviation dreams into reality with Mason Amelia. From first-time
              buyers to seasoned pilots — their journeys speak for themselves.
            </motion.p>
          </div>
        </div>

        <div className="testimonial_moving_card mt-8 md:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <InfiniteMovingCards
            bgColor=""
            pauseOnHover={true}
            speed={"slow"}
            items={testimonials}
            itemClass={"min-w-[600px]"}
          />
        </div>
      </section>
    </>
  );
};

export default Reviews;
