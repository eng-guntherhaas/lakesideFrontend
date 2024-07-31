export const api = {
  baseURL: "http://localhost:8080",
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error adding new room: ${errorData.message || response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error adding new room:", error);
    throw new Error("Error adding new room");
  }
}

export async function getRoomTypes() {
  try {
    const response = await fetch(`${api.baseURL}/rooms/room/types`);
    if (!response.ok) {
      throw new Error(`Error fetching room types: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw new Error("Error fetching room types");
  }
}

export async function getAllRooms() {
  try {
    const response = await fetch(`${api.baseURL}/rooms/all-rooms`);
    if (!response.ok) {
      throw new Error(`Error fetching rooms: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Error fetching rooms");
  }
}

export async function deleteRoom(roomId) {
  try {
    const response = await fetch(`${api.baseURL}/rooms/delete/room/${roomId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error deleting room: ${errorData.message || response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw new Error("Error deleting room");
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("photo", roomData.photo);
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);

  try {
    const response = await fetch(`${api.baseURL}/rooms/update/room/${roomId}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error updating room: ${errorData.message || response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error updating room:", error);
    throw new Error("Error updating room");
  }
}

export async function getRoomById(roomId) {
  try {
    const response = await fetch(`${api.baseURL}/rooms/room/${roomId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch room: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching room:", error.message);
    throw new Error("Failed to fetch room data. Please try again.");
  }
}

export async function bookRoom(roomId, booking) {
  try {
    const response = await fetch(
      `${api.baseURL}/bookings/room/${roomId}/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error booking room:", errorData);
      throw new Error(
        `Error booking room: ${errorData.message || response.status}`
      );
    }

    const data = await response.text();
    return { success: true, message: data };
  } catch (error) {
    console.error("Error booking room:", error);
    return { success: false, error: "Error booking room" };
  }
}

export async function getAllBookings() {
  try {
    const response = await fetch(`${api.baseURL}/bookings/all-bookings`);
    if (!response.ok) {
      throw new Error(`Error fetching bookings: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Error fetching bookings");
  }
}

export async function getBookingByConfirmationCode(confimationCode) {
  try {
    const response = await fetch(
      `${api.baseURL}/bookings/confirmation/${confimationCode}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch booking: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching booking:", error.message);
    throw new Error("Failed to fetch booking data. Please try again.");
  }
}

export async function cancelBooking(bookingId) {
  try {
    const response = await fetch(
      `${api.baseURL}/bookings/booking/${bookingId}/delete`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error canceling booking: ${errorData.message || response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw new Error("Error canceling booking");
  }
}
