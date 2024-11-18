import ReactDOM from "react-dom/client";
import App from "@/Appx";

const root = document.createElement("div");
root.id = "pmtk-root";
document.body.append(root);

ReactDOM.createRoot(root).render(<App />);
