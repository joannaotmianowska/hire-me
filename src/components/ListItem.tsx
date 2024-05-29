import React from "react";
import {useState, useEffect} from "react";
import {useMutation} from "react-query";
import {
  Child as ChildDetailsInteface,
  Hour as HourType,
} from "../types/apiTypes";
import {checkInChild, checkOutChild} from "../utils/api";

type ListItemProps = {
  child: ChildDetailsInteface;
  refetchListData: () => void;
};

function ListItem({child, refetchListData}: ListItemProps) {
  const [confirm, setConfirm] = useState(false);
  const [hourValue, setHourValue] = useState("" as HourType);
  const [action, setAction] = useState("" as "check in" | "check out");

  const {
    mutate: mutateCheckin,
    isError: isCheckinError,
    isSuccess: isCheckinSuccess,
  } = useMutation(checkInChild, {
    onMutate: () => {
      setAction("check in");
      setConfirm(false);
    },
    onSuccess: () => refetchListData(),
    onError: () => setConfirm(true),
  });
  const {
    mutate: mutateCheckout,
    isError: isCheckoutError,
    isSuccess: isCheckoutSuccess,
  } = useMutation(checkOutChild, {
    onMutate: () => {
      setAction("check out");
      setConfirm(false);
    },
    onSuccess: () => refetchListData(),
    onError: () => setConfirm(true),
  });

  useEffect(() => {
    setAction(child.checkedIn ? "check out" : "check in");
  }, []);

  const showConfirmation = () => {
    setConfirm(true);
  };

  const handleHourValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHourValue(e.target.value as HourType);
  };

  const handleCheckIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutateCheckin({childId: child.childId, pickupTime: hourValue});
    if (isCheckinSuccess) setConfirm(false);
  };

  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutateCheckout({childId: child.childId});
    if (isCheckoutSuccess) setConfirm(false);
  };

  return (
    <li className="child-details" key={child.childId}>
      <img src={child.image.small} alt={child.name.fullName} />
      <h2>{child.name.fullName}</h2>
      <p>Checked In: {child.checkedIn ? "✅" : "❌"}</p>
      {!confirm && (
        <button onClick={showConfirmation}>
          {child.checkedIn ? "check out" : "check in"}
        </button>
      )}
      {confirm && (
        <div>
          Are you sure you want to {action} {child.name.firstName}? Select check
          out time below and confirm.
          <form>
            {action === "check in" && (
              <>
                <label htmlFor="hour">Check out time:</label>
                <input
                  type="time"
                  value={hourValue}
                  onChange={handleHourValueChange}
                />
              </>
            )}
            <button
              type="button"
              onClick={action === "check in" ? handleCheckIn : handleCheckout}>
              Confirm
            </button>
          </form>
          {isCheckinError && (
            <div>Oops, something went wrong with checking in. Try again</div>
          )}
          {isCheckoutError && (
            <div>Oops, something went wrong with checking out. Try again</div>
          )}
          {isCheckinSuccess && (
            <div>Success! {child.name.firstName} has been checked in</div>
          )}
          {isCheckoutSuccess && (
            <div>Success! {child.name.firstName} has been checked out</div>
          )}
        </div>
      )}
    </li>
  );
}

export default ListItem;
