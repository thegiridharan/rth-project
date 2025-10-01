"use client";
import Dashboard from "@/components/Dashboard";
import { OptionProvider } from "@/utils/context";

export default function page1() {
    return (
        <OptionProvider>
            <Dashboard />
        </OptionProvider>
    )
};
