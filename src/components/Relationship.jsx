// OnirHero.jsx
import React from "react";
import relationshipImg from "/images/relationship.png"

const Relationship = ({ title, subtitle, image }) => {
    const relTitle = title || "Relationships for Life";
    const relSubtitle = subtitle || "This isn't transactional. This is a life-long friendship.";
    const relImage = image || relationshipImg;

    return (
        <section className="pb-20 flex items-center justify-center bg-white">
            <div className="container px-5 relative">
                <div className="bg-[#fffaf7] mx-auto flex flex-col md:flex-row items-center gap-10 px-6 md:px-10 py-16">
                    {/* Left Card */}
                    <div className="w-full md:w-[60%]">
                        {/* blue shape */}
                        <span className="absolute top-0 left-12 w-12 h-12 md:w-16 md:h-16 bg-tertiary_color rounded-b-[40px]" />

                        <div className="rounded-3xl py-10">
                            <h1 className="text-[2rem] md:text-[3rem] xl:text-7xl font-semibold text-[#111827] leading-tight">
                                {relTitle}
                            </h1>

                            <h3 className="py-4 text-xl xl:text-2xl font-bold text-[#222]">
                                {relSubtitle?.split("\n").map((line, i, arr) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < arr.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </h3>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full md:w-[40%] flex justify-center items-center">
                        <img src={relImage} className="w-full object-contain max-h-[400px]" alt="plane" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Relationship;
