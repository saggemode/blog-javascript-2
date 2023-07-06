import { Menu } from "@headlessui/react";
import React, { useContext } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
//import { settingBoxActions } from "../../store/settingBox-slice";

//import Theme from "./theme/Theme";
//import Language from "./language/Language";
//import { ISettingBoxRootState } from "../../lib/types/settingBox";
// import { Store } from "../../utils/Store";
import DropdownLink from "../DropdownLink";

const Settings = () => {
  //const { dispatch } = useContext(Store);

  // const isSettingBoxOpen = useSelector(
  //   (state: ISettingBoxRootState) => state.settingBox.isOpen
  // );

  function isSettingBoxOpen() {
    dispatch({ type: "openSettingBox" });
  }

  function toggleShowSettingBox() {
    dispatch({ type: "toggleSettingBox" });
  }

  function onCloseSettingBox() {
    dispatch({ type: "closeSettingBox" });
  }

  return (
    <div className="relative md:hidden flex justify-between items-center z-[150]">
      <Menu as="div" className="relative inline-block">
        <Menu.Button>
          <AiOutlineSetting style={{ fontSize: "1.5rem" }} />
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
          <Menu.Item>
            <DropdownLink className="dropdown-link" href="/profile">
              Language
            </DropdownLink>

            {/* <div className="absolute top-8 ltr:right-0 rtl:left-0 bg-palette-card shadow-md rounded-lg px-6 py-3 ">
              Languahe
              <hr className="my-1" />
              Theme
            </div> */}
          </Menu.Item>
          <hr className="my-1" />
          <Menu.Item>
            <DropdownLink className="dropdown-link" href="/profile">
              Theme
            </DropdownLink>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Settings;
