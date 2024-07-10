import { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const data = await getRoomTypes();
        setRoomTypes(data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };
    fetchRoomTypes();
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType && !roomTypes.includes(newRoomType)) {
      setRoomTypes((prevTypes) => [...prevTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <>
      <select
        className="form-select"
        name="roomType"
        id="roomType"
        value={newRoom.roomType}
        onChange={(e) => {
          if (e.target.value === "Add New") {
            setShowNewRoomTypeInput(true);
          } else {
            handleRoomInputChange(e);
          }
        }}
      >
        <option value="">Select a room type</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
        <option value="Add New">Add New</option>
      </select>
      {showNewRoomTypeInput && (
        <div className="input-group mt-2">
          <input
            className="form-control"
            type="text"
            placeholder="Enter a new room type"
            value={newRoomType}
            onChange={handleNewRoomTypeInputChange}
          />
          <button
            className="btn btn-hotel"
            type="button"
            onClick={handleAddNewRoomType}
          >
            Add
          </button>
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
