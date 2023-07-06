import React from "react";
import { HiOutlineLogin } from "react-icons/hi";
import Link from "next/link";

const LoginBtn = () => {
  return (
    <Link href={"/login"} legacyBehavior>
      <a aria-label="User actions">
        <div className="hidden md:flex items-center rounded-lg  py-1 px-2 ltr:mr-3 rtl:ml-3 border-[1px] border-gray-200 dark:border-gray-200/40 shadow-sm ">
          <HiOutlineLogin style={{ fontSize: "1.6rem" }} />
          <p className="ltr:ml-2 rtl:mr-2 text-xs">
            {/* {login} | {signUp} */}
          login
          </p>
        </div>
        <div className="md:hidden rtl:ml-3 rtl:mr-1 ltr:mr-3 ltr:ml-1">
          <HiOutlineLogin style={{ fontSize: "1.6rem" }} />
        </div>
      </a>
    </Link>
  );
};

export default LoginBtn;
