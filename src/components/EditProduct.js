import React from "react";
import { connect } from "react-redux";
import { Link, Fragment } from "react-router-dom";
import "../Account.css";
import { updateProduct } from "../store";
import {
  Modal,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

class EditProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      inventory: "",
      image: "",
      cost: "",
      categoryId: "",
      genreId: "",
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  save(ev) {
    ev.preventDefault();
    this.props.updateProduct(this.state);
    this.props.onClose();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.setState(this.props.product);
    }
    if (this.el) {
      this.el.addEventListener("change", (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          this.setState({ image: reader.result });
        });
        reader.readAsDataURL(file);
      });
    }
  }

  render() {
    const { categories, genres, open, onClose } = this.props;
    const { name, inventory, image, cost, categoryId, genreId } = this.state;
    const { save, onChange } = this;
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Product
          </Typography>
          <form className="create-product" onSubmit={save}>
            <TextField
              required
              margin="dense"
              type="text"
              name="name"
              label="Name"
              size="small"
              onChange={onChange}
              value={name}
            />
            <FormControl sx={{ mt: 1 }}>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                value={categoryId}
                label="Category"
                onChange={onChange}
              >
                {categories.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 1 }}>
              <InputLabel>Genre</InputLabel>
              <Select
                name="genreId"
                value={genreId}
                label="Genre"
                onChange={onChange}
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              required
              margin="dense"
              type="number"
              name="inventory"
              label="Inventory"
              size="small"
              onChange={onChange}
              value={inventory}
            />
            <TextField
              required
              margin="dense"
              type="number"
              name="cost"
              label="Cost"
              size="small"
              onChange={onChange}
              value={cost}
            />
            <input
              className="img-upload"
              type="file"
              ref={(el) => (this.el = el)}
            />
            <button className="create-btn" type="submit">
              Save
            </button>
          </form>
        </Box>
      </Modal>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProduct(product)),
  };
};

export default connect((state) => state, mapDispatch)(EditProduct);
