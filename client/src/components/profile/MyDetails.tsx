import { Grid, Stack, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useAuth } from "../../hooks/authController/AuthContext";
import { useState } from "react";
import ImageUploader from "react-images-uploading";

import shadowPersonImage from "../../assets/shadow-person.png";

const CircleImage = styled("div")({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  backgroundColor: "#aaa",
  backgroundImage: `url(${shadowPersonImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const EditButton = styled(Button)({
  marginTop: "16px",
});

export const MyDetails = () => {
  const { currentUser = {} } = useAuth();
  const [images, setImages] = useState([]);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  return (
    <Stack spacing={3} alignItems="center">
      <CircleImage />
      {/* <ImageUploader
        onChange={onChangeImage}
        maxNumber={maxNumber}
        acceptType={acceptType}
        dataURLKey="data_url" value={[]}      >
        {({ onImageUpload, isDragging, dragProps }) => (
          <div onClick={onImageUpload} {...dragProps}>
            {image ? (
              <img src={image} alt="uploaded" width="100" />
            ) : (
              <div>
                <Button variant="contained" color="primary" >
                  Pick an image
                </Button>
                {isDragging && <div>Drop here</div>}
              </div>
            )}
          </div>
        )}
      </ImageUploader> */}
      <EditButton variant="contained" color="primary">
        Edit
      </EditButton>
      <Typography variant="h4" color="primary">
        {currentUser?.["firstName"]} {currentUser?.["lastName"]}
      </Typography>
      <Typography variant="h4" color="primary">
        {currentUser?.["username"]}
      </Typography>
      <Typography variant="h4" color="primary">
        {currentUser?.["email"]}
      </Typography>
    </Stack>
  );
};
