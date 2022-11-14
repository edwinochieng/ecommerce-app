import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { Store } from "../context/CartContext";
import Router from "next/router";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { status, data: session } = useSession();
  const { cart, dispatch } = React.useContext(Store);

  const logOutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };
  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "black", fontSize: 16 }}
      >
        {session?.user.name}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => Router.push("/profile")}>Profile</MenuItem>
        <MenuItem onClick={logOutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
