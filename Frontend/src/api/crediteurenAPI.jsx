import api from "../api.js";

export async function fetchActiveCrediteuren() {
    try {
        const response = await api.get("/crediteur/bedrijf");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch crediteuren");
    }
}

export async function fetchPendingCrediteuren() {
    try {
        const response = await api.get("/crediteur/pending");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch crediteuren");
    }
}

export async function fetchReviewableCrediteuren() {
    try {
        const response = await api.get("/crediteur/reviewable");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch crediteuren");
    }
}

export async function fetchPendingCrediteurenSize(){
    try {
        const response = await api.get("/crediteur/pending/length");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch crediteuren");
    }
}

export async function fetchCrediteurById(id) {
    try {
        const response = await api.get("/crediteur/" + id);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch crediteuren");
    }
}

export async function createCrediteur(crediteur) {
    try {
        const response = await api.post("/crediteur/create", crediteur);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch crediteuren");
    }
}

export async function setCrediteurStatus(action, statusData) {
    try {
        const response = await api.put("/crediteur/" + action, statusData);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch crediteuren");
    }
}
