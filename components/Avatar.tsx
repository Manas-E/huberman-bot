import Image from "next/image";
import React from "react";

const Avatar = ({ src, className }) => {
  return (
    <Image
      className={"h-10 rounded " + className}
      src={src}
      alt="Default avatar"
      height={0}
      width={40}
    />
  );
};

export default Avatar;
