import { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { roomId } = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setRoom((prev) => ({ ...prev, photo: selectedImage }));
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await updateRoom(roomId, room);
      if (success) {
        setSuccessMessage("The room's informations were updated");
        const updatedRommData = await getRoomById(roomId);
        setRoom(updatedRommData);
        setImagePreview(updatedRommData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Edit Room</h2>

            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="roomType"
                    name="roomType"
                    value={room.roomType}
                    onChange={handleRoomInputChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Room Price
                </label>
                <input
                  className="form-control"
                  required
                  id="roomPrice"
                  name="roomPrice"
                  type="number"
                  min="0"
                  value={room.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Room Photo
                </label>
                <input
                  className="form-control"
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview room photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mt-3"
                  />
                )}
              </div>
              <div className="d-grid gap-2 d-md-flex mt-2">
                <Link
                  to={"/existing-rooms"}
                  className="btn btn-outline-info ml-5"
                >
                  Back
                </Link>
                <button type="submit" className="btn btn-outline-warning">
                  Edit Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditRoom;
