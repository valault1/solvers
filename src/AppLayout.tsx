import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { AppRoutes } from "./AppRoutes";
import { theme } from "./components/theme/theme";

export const AppLayout = () => {
    const location = useLocation();
    const isPrizeSelection = location.pathname.toLowerCase().includes('/brexipo');

    if (isPrizeSelection) {
        return (
            <div style={{ backgroundColor: "#111", minHeight: "100vh", width: "100vw", margin: 0, padding: 0 }}>
                <AppRoutes />
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.textPrimary,
                minHeight: "100vh"
            }}
        >
            <NavBar />
            <AppRoutes />
        </div>
    );
};
