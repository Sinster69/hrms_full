const BASE_URL = "http://127.0.0.1:8000";

export const getDashboard = async () => {
  const res = await fetch(`${BASE_URL}/dashboard`);
  return res.json();
};

export const punchIn = async () => {
  const res = await fetch(`${BASE_URL}/attendance/punch`, {
    method: "POST",
  });
  return res.json();
};

export const punchOut = async () => {
  const res = await fetch(`${BASE_URL}/attendance/punch-out`, {
    method: "POST",
  });
  return res.json();
};