import { useEffect } from "react";

export default function Logout() {
    useEffect(() => {
        alert("logged out");
        localStorage.removeItem('name')
        window.location.href = '/'
    },[])
}