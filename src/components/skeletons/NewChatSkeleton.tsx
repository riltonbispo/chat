import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const NewChatSkeleton = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#fdba74" highlightColor="#ffedd5">
        <Skeleton count={13} height={60} />
      </SkeletonTheme>
    </div>
  );
};

export default NewChatSkeleton;
