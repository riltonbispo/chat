import React from "react";
import Image from "next/image";

const Intro = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full border-b-4 border-indigo-500 px-2">
      <Image
        src="https://blog.iprocess.com.br/wp-content/uploads/2021/11/placeholder.png"
        width={250}
        height={40}
        alt=""
      />
      <h1>Hello Word </h1>
      <h2>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente modi,
        corporis nostrum numquam asperiores optio praesentium harum unde esse
        consequuntur reiciendis quo ratione officiis. Quam sed ab debitis
        similique qui!
      </h2>
    </div>
  );
};

export default Intro;
