import axios from "axios";
import { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  console.log(url)

  const uploadImage = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'aquilav1'); // Specify your upload preset here

    // Make a POST request to Cloudinary with the upload preset
    axios.post('https://api.cloudinary.com/v1_1/da7zudna9/image/upload', data)
      .then((response) => {
        setUrl(response.data.url); // Assuming the URL is in the response data
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <input type="file" 
      onChange={(e) => setImage(e.target.files[0])}/>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default ImageUpload;
