import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/api/users/reset-password?token=${token}&newPassword=${newPassword}`);
            setMsg(res.data.message);
        } catch (err) {
            setMsg(err.response?.data?.message || "Error occurred");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
            <h2>Reset Password</h2>
            <input placeholder="New Password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={{ display: "block", width: "100%", margin: "10px 0" }} />
            <button onClick={handleSubmit} style={{ width: "100%", padding: "10px" }}>Reset Password</button>
            <p>{msg}</p>
        </div>
    );
}
