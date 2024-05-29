import {groupId, institutionId, apiUrl} from "../config";
import {CheckInVariables, CheckOutVariables} from "../types/apiTypes";

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export const fetchDashboardData = async () => {
  const response = await fetch(
    `${apiUrl}/daycare/tablet/group?accessToken=${ACCESS_TOKEN}&groupId=${groupId}&institutionId=${institutionId}`,
  );
  return response.json();
};

export const checkInChild = async ({childId, pickupTime}: CheckInVariables) => {
  const response = await fetch(`${apiUrl}/v2/children/${childId}/checkins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({accessToken: ACCESS_TOKEN, pickupTime}),
  });
  return response.json();
};

export const checkOutChild = async ({childId}: CheckOutVariables) => {
  const response = await fetch(`${apiUrl}/v2/children/${childId}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({accessToken: ACCESS_TOKEN}),
  });
  return response.json();
};
