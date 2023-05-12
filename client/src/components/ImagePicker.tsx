import { Button } from "@mui/material";
import { useState } from "react";
import ImageUploading from "react-images-uploading";

interface ImagePickerProps {
    image: string | undefined;
    onChangeImage: (ImageListType) => void;
}

function ImagePicker(props: ImagePickerProps) {
    const {image, onChangeImage} = props;

    const maxNumber = 1;
    const acceptType = ["jpg", "jpeg", "png"];

    return (
        <div>
            <ImageUploading
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
            </ImageUploading>
        </div>
    );
}

export default ImagePicker;