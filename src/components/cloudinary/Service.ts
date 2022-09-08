import axios from "axios";
import sha1 from "sha1";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../../util/util";

export const deleteImage = async (pID) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const string = `public_id=${pID}&timestamp=${timestamp}${API_SECRET}`;
  const signature = sha1(string);
  const formData = new FormData();
  formData.append("public_id", pID);
  formData.append("signature", signature);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", timestamp as any);
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
    formData
  );

  console.log("resultado borrar una imagen", res);
};
// export const deleteResource = async (product: Product) => {
//   alert("vas a borrar la carpeta");
//   const formData = new FormData();
//   // product.image.forEach((i) => {
//   //   formData.append("public_ids[]", i);
//   // });
//   const images = [
//     "fernnandoleonett@gmai.com/555/i2njhgcexlzoutoyzmzt",
//     "fernnandoleonett@gmai.com/555/ecwgmadbmkejsy21rvn5",
//   ];
//   formData.append("public_ids[]", images[0]);
//   formData.append("public_ids[]", images[1]);
//   const timestamp = Math.round(new Date().getTime() / 1000);

//   const str = images.map((i) => `public_id=${i}&`);

//   const string = `${str}timestamp=${timestamp}${API_SECRET}`;
//   const signature = sha1(string);

//   formData.append("signature", signature);
//   formData.append("api_key", API_KEY);
//   formData.append("timestamp", timestamp as any);

//   const res = await axios.delete(
//     `api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload/`,
//     formData
//   );
//   console.log("resultado borrar  contenido carpeta", res);

//   //api.cloudinary.com/v1_1/{{cloud_name}}/resources/image/upload/
// };

// export function deleteResource(p: Product) {
//   const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
//   var myHeaders = new Headers();
//   myHeaders.append(
//     "Authorization",
//     "Basic MjU4MTk3NTQ3MTkzNzUzOmV4RGpzb2lQb2tIb1hvVmtNVDJ0ZlE0Y19nOA=="
//   );

//   var formdata = new FormData();
//   formdata.append(
//     "public_ids[]",
//     "fernnandoleonett@gmai.com/555/ecwgmadbmkejsy21rvn5"
//   );
//   formdata.append(
//     "public_ids[]",
//     "fernnandoleonett@gmai.com/555/i2njhgcexlzoutoyzmzt"
//   );

//   var requestOptions = {
//     method: "DELETE",
//     // headers: myHeaders,
//     body: formdata,
//     redirect: "follow",
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   };

//   fetch(
//     corsAnywhere +
//       "https://api.cloudinary.com/v1_1/fernandoleonett/resources/image/upload/",
//     requestOptions
//   )
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
