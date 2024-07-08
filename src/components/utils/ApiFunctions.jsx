export const api = {
  baseURL: "http://localhost:8080/api/v1",
};

export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const response = await fetch(`${api.baseURL}/rooms/add/new-room`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getRoomTypes() {
  try {
    const response = await fetch(`${api.baseURL}/rooms/room-types`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching room type");
  }
}
