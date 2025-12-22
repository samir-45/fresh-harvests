import Image from "next/image";
import React from "react";

const SpecialOfferCard = () => {
  return (
    <div className="relative left-0 top-1/2 -translate-y-1/2 z-20 -bottom-34 xl:-right-54 lg:-right-44 md:right-0 md:left-auto">
      
      {/* Orange Doodle Arrow */}
      <div className="absolute bottom-16 -left-20 w-16 h-16 hidden sm:block pointer-events-none">
        <Image src="/assets/images/arrow-1.svg" alt="" fill className="object-contain" />
      </div>

      {/* card */}
      <div className="bg-[#EBEBEB] backdrop-blur-sm p-4 rounded-2xl shadow-xl flex flex-row-reverse items-center gap-4 pr-8 max-w-[320px] absolute bottom-0 left-2">
        <div className="w-20 h-20 shrink-0 relative rounded-full overflow-hidden shadow-sm bg-gray-100">
          <Image src="/assets/images/salad-bowl.png" alt="Fresh Salad" fill className="object-cover" />
        </div>
        <div>
          <span className="block text-xs text-[#176D38] font-bold uppercase tracking-wider mb-1">Special Offer</span>
          <h3 className="text-lg font-bold text-fresh-dark leading-tight">Fresh Salad</h3>
          <p className="text-fresh-gray text-xs mb-2">
            Up to <span className="text-fresh-dark font-bold">70%</span> off
          </p>
          <div className="bg-[#176D38] text-white text-[10px] font-bold px-3 py-1 rounded-full inline-block">
            CODE: <span className="text-[#FAC714]">FRESH25</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SpecialOfferCard;