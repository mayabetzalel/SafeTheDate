import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

interface Item {
  _id: string;
  description: string;
}

const AppSearch = () => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // const debouncedValue = useDebounce<string>(searchInput, 500);
  // const { data, isLoading, isError, isSuccess } = useQuery<Item[] | undefined>(
  //   ["itemsDesc", debouncedValue],
  //   () => getAllItemsDesc(debouncedValue)
  // );
  const [options, setOptions] = useState<readonly Item[] | undefined>([]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      // onChange={(e, value) => {
      //   value?._id
      //     ? navigate(RoutePaths.PRODUCT_DETAILS_NO_ID + "/" + value?._id)
      //     : navigate(RoutePaths.HOME);
      // }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={(event, newInputValue) => {
        setSearchInput(newInputValue);
      }}
      isOptionEqualToValue={(option, value) =>
        option.description === value.description
      }
      getOptionLabel={(option) => option.description}
      options={options ? options : [{ _id: "", description: "No Data" }]}
      loading={false}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {false ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AppSearch
