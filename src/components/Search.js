import React from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ProductList from "./ProductList";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Search = ({ products, categories, genres }) => {
  const query = useQuery();
  const history = useHistory();
  const q = query.get("q") || "";
  const category = query.get("category") ?? "";
  const genre = query.get("genre") ?? "";

  function onChange(ev) {
    const value = ev.target.value;
    query.set("q", ev.target.value);
    history.push({
      search: query.toString(),
    });
  }

  const filteredProducts = products.filter((product) => {
    const nameMatch =
      q !== ""
        ? product.name.toLowerCase().includes(q.toLowerCase().replace("+", " "))
        : true;
    const categoryMatch =
      category !== "" ? product.categoryId === +category : true;
    const genreMatch = genre !== "" ? product.genreId === +genre : true;

    return nameMatch && categoryMatch && genreMatch;
  });

  return (
    <div style={{ display: "flex" }}>
      <div style={{ minWidth: "200px", mb: 1 }}>
        <h3>Filter Results</h3>
        <TextField
          name="search term"
          label="Search Products"
          size="small"
          onChange={onChange}
          value={q}
        />
        <Category categories={categories} />
        <Genre genres={genres} />
      </div>
      {filteredProducts.length === 0 ? (
        <h1>No Products Found!</h1>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};

export default connect((state) => state)(Search);

function Category({ categories }) {
  return (
    <SelectFilter values={categories} paramName="category" label="Categories" />
  );
}

function Genre({ genres }) {
  return <SelectFilter values={genres} paramName="genre" label="Genres" />;
}

function SelectFilter({ values, paramName, label }) {
  const query = useQuery();
  const history = useHistory();
  const currentValue = query.get(paramName) || "";

  function onChange(ev) {
    query.set(paramName, ev.target.value);
    history.push({
      search: query.toString(),
    });
  }

  return (
    <div>
      <InputLabel id={paramName} sx={{ m: 2 }}>
        {label}
      </InputLabel>
      <Select
        displayEmpty
        labelId={paramName}
        value={currentValue}
        label={label}
        onChange={onChange}
        style={{ minWidth: "200px" }}
      >
        <MenuItem value={""}>Show all</MenuItem>
        {values.map((value) => (
          <MenuItem key={value.id} value={value.id}>
            {value.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
