import { Grid, Stack, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useAuth } from "../../hooks/authController/AuthContext";
import { useState } from "react";
import ImageUploader from "react-images-uploading";

import shadowPersonImage from "../../assets/shadow-person.png";
import ImagePicker from "../ImagePicker";
import { useMutation, useQuery } from "urql";
import { graphql } from "../../graphql";
import { Exact, MutationResponse, UserResponse} from "../../graphql/graphql";
import { useSnackbar } from "notistack";

const CircleImage = styled("img")({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  backgroundColor: "#aaa",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const EditButton = styled(Button)({
  marginTop: "16px",
});

const USER_QUERY = graphql(`
  query User($userId: String!) {
    user(userId: $userId) {
      image
    }
  }
`);

const UPDATE_IMAGE_MUTATION = graphql(`
  mutation updateImage($userId: String!, $image: Upload!) {
    updateImage(userId: $userId, image: $image) {
      message
      code
    }
  }
  `);

export const MyDetails = () => {
  const { currentUser = {} } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [editedImage, setEditedImage] = useState(undefined);
  const [image, setImage] = useState(undefined);

  const [{ data = { user: {} }, fetching, error }] = useQuery<
    { user: Exact<UserResponse> },
    { userId: string; }
  >({
    query: USER_QUERY,
    variables: {
      userId: currentUser?.['_id']
    },
  });

  const [updateUserImageResult, updateUserImage] = useMutation<
    {
      updateImage: MutationResponse;
    }>(UPDATE_IMAGE_MUTATION);

  const onChangeImage = (imageList) => {
    // only allow one image to be uploaded
    if (imageList.length === 1) {
      setEditedImage(imageList[0].data_url);
    }
  };

  function saveImage() {
    updateUserImage({ image: editedImage, userId: currentUser?.['_id'] }).then((result) => {
      if (result.error) {
        console.error("Error updating ticket:", result.error);
        enqueueSnackbar("An error occurred", { variant: "error" });
      } else {
        enqueueSnackbar(`image saved succesfully`, { variant: "success" });
        console.log("Ticket updated:", result.data?.updateImage);
      }
    });

    setImage(editedImage);
    setEditedImage(undefined);
  }

  return (
    <Stack spacing={3} alignItems="center">
      <CircleImage src={image || data.user?.image || shadowPersonImage} alt="uploaded"/>
      <ImagePicker image={editedImage} onChangeImage={onChangeImage} buttonTitle="Edit image" />
      {editedImage && <Button onClick={saveImage} variant="contained" color="primary">Save Image</Button>}
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

