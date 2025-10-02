import Page from "@/components/Listings-input";
import { InputProvider } from "@/utils/form-context";

export default function page() {
    return (
        <InputProvider>
            <Page />
        </InputProvider>
    );
};
