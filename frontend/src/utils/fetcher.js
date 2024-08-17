import { enqueueSnackbar } from "notistack";

const fetcher = async (path) => {
    const response = await fetch(`/api/${path}`);
    const data = await response.json();

    if (data?.error) {
        enqueueSnackbar(data?.error?.message || `${data?.error?.status} Something went wrong`, { variant: "error" });
    }
    return data;
};

export default fetcher;
