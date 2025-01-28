const login = async (loginData: LoginData) => {
  try {
    const response = await fetch("/api/routes/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { login };
