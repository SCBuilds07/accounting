import api from "../api.js";

export async function login(loginForm) {
    try{
        const response = (await api.post("/auth/login", loginForm));

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("BedrijfNaam", response.data.bedrijf.name);

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch bedrijf data");
    }
}

export async function fetchUserId() {
    try {
        const response = (await api.get("/auth/id"));

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch user_id");

    }
}