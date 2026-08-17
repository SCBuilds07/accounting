import { Link, useLocation } from "react-router-dom";
import {useState} from "react";
import "./Breadcrumbs.scss"

export default function Breadcrumbs() {
    const location = useLocation();
    const [name, setName] = useState(localStorage.getItem("BedrijfNaam"))
    const basePath = "/dashboard";

    if (!location.pathname.startsWith(basePath)) {
        return null;
    }

    const parts = location.pathname
        .slice(basePath.length)
        .split("/")
        .filter(Boolean);

    return (
        <nav>
            <Link to="/dashboard">{name}</Link>

            {parts.map((part, index) => {
                const path =
                    basePath + "/" + parts.slice(0, index + 1).join("/");

                return (
                    <span key={path}>
            {" > "}
                        <Link to={path}>
              {part}
            </Link>
          </span>
                );
            })}
        </nav>
    );
}
