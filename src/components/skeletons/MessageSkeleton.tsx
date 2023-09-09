import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="p-4">
      <SkeletonTheme baseColor="#57534e" highlightColor="#78716c">
        <div className="w-full flex justify-start">
          <div className="flex items-start">
            <div className="flex flex-col gap-1">
              <Skeleton height={40} width={140} />
              <Skeleton height={25} width={80} />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <div className="flex items-end">
            <div className="flex items-end flex-col gap-1">
              <Skeleton height={40} width={140} />
              <Skeleton height={25} width={80} />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-start">
          <div className="flex items-start">
            <div className="flex flex-col gap-1">
              <Skeleton height={40} width={140} />
              <Skeleton height={25} width={80} />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-start">
          <div className="flex items-start">
            <div className="flex flex-col gap-1">
              <Skeleton height={40} width={140} />
              <Skeleton height={25} width={80} />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <div className="flex items-end">
            <div className="flex items-end flex-col gap-1">
              <Skeleton height={40} width={140} />
              <Skeleton height={25} width={80} />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-start">
          <div className="flex items-start">
            <div className="flex flex-col gap-1">
              <Skeleton height={40} width={140} />
              <Skeleton height={25} width={80} />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default MessageSkeleton;
