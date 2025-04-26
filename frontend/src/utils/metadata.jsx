import { useState, useEffect } from "react";
import ePub from "epubjs";

const useMetadata = (file) => {
    const [metadata, setMetadata] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!file) return;

        const loadMetadata = async () => {
            setLoading(true);
            setError(null);

            try {
                const book = ePub(file);
                const meta = await book.loaded.metadata;
                setMetadata(meta);
            } catch (err) {
                console.error("Error loading EPUB metadata:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadMetadata();
    }, [file]);

    return { metadata, error, loading };
};

export { useMetadata };
