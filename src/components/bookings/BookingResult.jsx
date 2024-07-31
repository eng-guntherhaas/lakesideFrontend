import { useLocation } from "react-router-dom";
import Header from "../common/Header";

const BookingResult = () => {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;

  return (
    <div>
      <Header title="Booking Status" />
      <div className="mt-5">
        {message ? (
          <div>
            <h3 className="text-success">{message}</h3>
          </div>
        ) : (
          <div>
            <h3 className="text-danger">{error}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingResult;
