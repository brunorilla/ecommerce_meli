import { Link } from "react-router-dom";

interface BreadcrumbProps {
    categories: string[];
}

const Breadcrumb = ({ categories }: BreadcrumbProps) => {
    if (!categories.length) return null;

    return (
        <nav aria-label="breadcrumb" className="text-sm text-gray-500 py-2">
            <ul className="flex gap-2">
                {categories.map((category, index) => (
                    <li key={index} className="flex items-center">
                        {index !== 0 && <span className="mx-1">{">"}</span>}
                        <Link to={`/category/${category}`} className="hover:underline">
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;