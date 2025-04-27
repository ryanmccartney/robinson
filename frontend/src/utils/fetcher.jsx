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

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        data = await response.json();
    } else {
        data = {
            text: await response.text(),
            error: {
                status: response.status,
            },
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
