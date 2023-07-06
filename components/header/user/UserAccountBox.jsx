import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

import { AiOutlineHeart } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import jsCookie from "js-cookie";

const UserAccountBox = ({ onClose }) => {
  const dispatch = useDispatch();
  function onLogoutClickHandler() {
    onClose();
  }
  return (
    <div>
      <ul>
        <li className="my-1 py-1" onClick={onClose}>
          <Link href={"/favorite"} legacyBehavior>
            <a className="flex items-center hover:text-palette-primary">
              <AiOutlineHeart
                style={{
                  fontSize: "1.2rem",
                  width: "1.8rem",
                }}
              />
              <span className="font-normal rtl:mr-1 ltr:ml-1">
                favorites
              </span>
            </a>
          </Link>

          {/* admin panel s */}
          <Link href={"/admin"} legacyBehavior>
            <a className="flex items-center hover:text-palette-primary">
              <RiAdminLine
                style={{
                  fontSize: "1.2rem",
                  width: "1.8rem",
                }}
              />
              <span className="font-normal rtl:mr-1 ltr:ml-1">
               Admin
              </span>
            </a>
          </Link>
        </li>
        <li className="my-1 py-1" onClick={onLogoutClickHandler}>
          <Link href={`/`} legacyBehavior>
            <a className="flex items-center hover:text-palette-primary">
              <IoLogOutOutline
                style={{
                  fontSize: "1.5rem",
                  width: "1.8rem",
                }}
              />
              <span className="font-normal rtl:mr-1 ltr:ml-1">logout</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserAccountBox;
