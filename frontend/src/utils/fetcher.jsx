import { enqueueSnackbar } from "notistack";

const fetcher = async (
    path,
    body = {},
    method = "GET",
    showErrorMessages = true
) => {
    let data = {};
    const response = await fetch(`/api/${path}`, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: method == "GET" ? undefined : JSON.stringify(body),
    });

    if (response.status === 200) {
        data = await response.json();
    } else {
        data.error = {
            status: response.status,
        };
    }

    if (data?.error && showErrorMessages) {
        enqueueSnackbar(
            data?.error?.message
                ? data?.error?.message
                : `${data?.error?.status}: Something went wrong`,
            { variant: "error" }
        );
    }
    return data;
};

fetcher.get = async (path, body) => {
    return await fetcher(path, body, "GET");
};

fetcher.put = async (path, body) => {
    return await fetcher(path, body, "PUT");
};

fetcher.post = async (path, body) => {
    return await fetcher(path, body, "POST");
};

fetcher.delete = async (path, body) => {
    return await fetcher(path, body, "DELETE");
};

export default fetcher;
