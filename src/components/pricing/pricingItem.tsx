import React from 'react';
import { useRouter } from 'next/router';

const PricingItem = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/apps/pricing/details')}
      className="border rounded bg-white h-[110px] flex items-center px-7 justify-between cursor-pointer"
    >
      <p className="font-bold text-lg">Starter</p>
      <div className="text-[#0846A6] border border-[#0846A6] text-xs px-[14px] py-1 bg-[#0846A6]/5  rounded-sm">
        1.99
      </div>
      <p className="text-xs font-semibold">Bi-weekly</p>
      <p className="text-xs font-semibold">Upfront</p>
    </div>
  );
};

export default PricingItem;
