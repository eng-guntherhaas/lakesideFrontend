import moment from "moment";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, totalCost, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = async () => {
    setIsProcessingPayment(true);
    try {
      const message = await onConfirm();
      navigate("/booking-result", { state: { message } });
    } catch (error) {
      navigate("/booking-result", { state: { error: error.message } });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="card card-body mt-5">
      <h4>Reservation Summary</h4>
      <p>
        Name: <strong>{booking.guestName}</strong>
      </p>
      <p>
        Email: <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check-in Date:{" "}
        <strong>{moment(booking.checkInDate).format("Do MMM YYYY")}</strong>
      </p>
      <p>
        Check-out Date:{" "}
        <strong>{moment(booking.checkOutDate).format("Do MMM YYYY")}</strong>
      </p>
      <p>
        Number of days: <strong>{numberOfDays}</strong>
      </p>
      <div>
        <h5>Number of Guests</h5>
        <strong>
          <p>
            Adult{booking.numberOfAdults > 1 ? "s" : ""}:{" "}
            {booking.numberOfAdults}
          </p>
          <p>Children: {booking.numberOfChildren}</p>
        </strong>
      </div>
      <div>
        {totalCost > 0 ? (
          <>
            <p>
              Total payment: <strong>$ {totalCost}</strong>
            </p>
            {isFormValid && (
              <Button variant="success" onClick={handleConfirmBooking}>
                {isProcessingPayment ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing payment...
                  </>
                ) : (
                  "Confirm Booking and proceed to payment"
                )}
              </Button>
            )}
          </>
        ) : (
          <p className="text-danger">
            Check-out date must be after the check-in date
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
