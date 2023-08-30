import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate, Link } from "react-router-dom";
import { fetchProducts, setSearchQuery } from "../store/productSlice";
import { clearUserCredential, setAddress,setUserCredential } from "../store/authSlice";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { clearCart } from "../store/cartSlice";
import { resetTrigger } from "../store/triggerSlice";

const Navbar: React.FC = () => {

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | ''>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth?.userCredential)
console.log("token",token?token?.accessToken:"null");

  const items = useSelector((state: RootState) => state.cart);
  const triggerCount = useSelector(
    (state: RootState) => state.trigger.triggerCount
  );
  //   const { username } = useSelector((state: RootState) => state.auth);
  const { username, address,userCredential } = useSelector((state: RootState) => state.auth);

  const [drawerState, setDrawerState] = useState({
    left: false,
  });
  const [avatarAnchor, setAvatarAnchor] = useState<HTMLElement | null>(null);

  const toggleDrawer = (anchor: string, open: boolean) => () => {
    setDrawerState({ ...drawerState, [anchor]: open });
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value)); // Dispatch setSearchQuery with the search query
  };

  const openAvatarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarAnchor(event.currentTarget);
  };

  const closeAvatarMenu = () => {
    setAvatarAnchor(null);
  };

  const logoutHandler = () => {
    dispatch(clearCart());
    dispatch(resetTrigger());
    // localStorage.clear();
    dispatch(clearUserCredential())
    navigate("/");
  };
  useEffect(() => {
    // Fetch categories
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(data => setCategories(data));

    // Fetch products based on the selected category
    const apiURL = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : 'https://fakestoreapi.com/products';

    dispatch(fetchProducts(apiURL));
}, [dispatch, selectedCategory]);

const electronicsHandler = () =>{

  const apiURL = selectedCategory
      ? `https://fakestoreapi.com/products/category/electronics`
      : 'https://fakestoreapi.com/products/category/electronics';

  dispatch(fetchProducts(apiURL));
}
const jeweleryHandler = () =>{
  const apiURL = selectedCategory
      ? `https://fakestoreapi.com/products/category/jewelery`
      : `https://fakestoreapi.com/products/category/jewelery`;

  dispatch(fetchProducts(apiURL));
}
const mensClothHandler = () =>{
  const apiURL = selectedCategory
      ? `https://fakestoreapi.com/products/category/men's%20clothing`
      : `https://fakestoreapi.com/products/category/men's%20clothing`

  dispatch(fetchProducts(apiURL));
}
const womensClothHandler = () =>{
  const apiURL = selectedCategory
      ? `https://fakestoreapi.com/products/category/women's%20clothing`
      : `https://fakestoreapi.com/products/category/women's%20clothing`

  dispatch(fetchProducts(apiURL));
}

const closeDrawer = () => {
  setDrawerState({ ...drawerState, left: false });
};
  return (
    <AppBar position="static" sx={{ backgroundColor: "#131921" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerState.left}
          onClose={toggleDrawer("left", false)}
        >
            <Typography variant="h6">Hi, {username}</Typography>
          <List>
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={closeDrawer} 

            >
              <ListItem button>
                <ListItemText primary="About Us" />
              </ListItem>
            </Link>

            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={closeDrawer} 

            >
              <ListItem button>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </Link>

            <Link
              to="/order_history"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={closeDrawer} 


            >
              <ListItem button>
                <ListItemText primary="Order History" />
              </ListItem>
            </Link>
<h3>Category</h3>
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={closeDrawer} 

            >
              <ListItem button>
                <ListItemText primary="Electronics" onClick={electronicsHandler}/>
              </ListItem>
            </Link>
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={closeDrawer} 

            >
              <ListItem button>
                <ListItemText primary="Jewelery" onClick={jeweleryHandler}/>
              </ListItem>
            </Link>
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={closeDrawer} 

            >
              <ListItem button>
                <ListItemText primary="Mens Cloth" onClick={mensClothHandler}/>
              </ListItem>
            </Link>
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={closeDrawer} 

            >
              <ListItem button>
                <ListItemText primary="Womens Cloth" onClick={womensClothHandler}/>
              </ListItem>
            </Link>

          </List>
        </Drawer>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            <span
              style={{ fontWeight: "bold", fontSize: "24px", color: "white" }}
            >
              Amazon
            </span>{" "}
            Store
          </Link>
        </Typography>
        <TextField
          id="search-bar"
          // label="Search"
          placeholder="Search..."
          variant="outlined"
          onChange={handleSearch}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "gray" }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
            width: "500px",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        />
        <div style={{ width: "15px" }}></div>

        <Avatar
          sx={{
            bgcolor: "#f0c14b",
            width: 32,
            height: 32,
            fontSize: "18px",
            cursor: "pointer",
          }}
          onClick={openAvatarMenu}
        >
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <IconButton color="inherit">
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <Badge badgeContent={triggerCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </IconButton>
        <Menu
          anchorEl={avatarAnchor}
          open={Boolean(avatarAnchor)}
          onClose={closeAvatarMenu}
          onClick={closeAvatarMenu}
        >
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
