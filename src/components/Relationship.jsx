// OnirHero.jsx
import React from "react";
import relationshipImg from "/images/relationship.png"

const Relationship = () => {
    return (
        <section className="pb-20 flex items-center justify-center bg-white">
            <div className="container px-5 relative">
                <div className="bg-[#fffaf7] mx-auto flex flex-col md:flex-row items-center gap-10 px-6 md:px-10 py-16">
                    {/* Left Card */}
                    <div className="w-full md:w-1/2">
                        {/* blue shape */}
                        <span className="absolute top-0 left-12 w-12 h-12 md:w-16 md:h-16 bg-tertiary_color rounded-b-[40px]" />

                        <div className="rounded-3xl py-10 ">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#111827] leading-tight">
                                Relationship for Life
                            </h1>

                            <p className="mt-6 text-base md:text-xl text-[#6B7280] max-w-md">
                                This isn’t transactional. This is a life-long friendship
                            </p>
                        </div>
                    </div>

                    {/* Right: Phone Mockup */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img src={relationshipImg} className="w-full scale-[1.2] 2xl:scale-[1.5]" alt="plane" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Relationship;
