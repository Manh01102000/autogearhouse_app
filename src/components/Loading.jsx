import { useLoading } from "../contexts/LoadingContext";

const LoadingComponent = () => {
    const { isLoading } = useLoading();

    return (
        <div id="loading" style={{ display: isLoading ? "block" : "none" }}>
            <div className="loading">
                <span className="loading-circle"></span>
                <span className="loading-circle"></span>
                <span className="loading-circle"></span>
                <span className="loading-circle-shadow"></span>
                <span className="loading-circle-shadow"></span>
                <span className="loading-circle-shadow"></span>
            </div>
        </div>
    );
};

export default LoadingComponent;
