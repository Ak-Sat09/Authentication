import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [msg, setMsg] = useState("Verifying...");

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/users/verify?token=${token}`);
                setMsg(res.data.message);
            } catch (err) {
                setMsg(err.response?.data?.message || "Verification failed");
            }
        };
        if (token) verify();
    }, [token]);

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
            <h2>Email Verification</h2>
            <p>{msg}</p>
        </div>
    );
}
