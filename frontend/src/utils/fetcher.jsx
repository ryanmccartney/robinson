import { enqueueSnackbar } from "notistack";

const fetcher = async (path, method = "GET", body = {}) => {
    const response = await fetch(`/api/${path}`, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: method == "GET" ? undefined : JSON.stringify(body),
    });

    const data = await response.json();

    if (data?.error) {
        enqueueSnackbar(
            data?.error?.message ||
                `${data?.error?.status}: Something went wrong`,
            { variant: "error" }
        );
    }
    return data;
};

export default fetcher;
