import { useLocation } from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess = () => {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;

  return (
    <div>
      <Header title="Booking Successful" />
      <div className="mt-5">
        {message ? (
          <div>
            <h3 className="text-success">Booking Successful</h3>
            <p className="text-success">{message}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-danger">Error booking room</h3>
            <p className="text-danger">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;
