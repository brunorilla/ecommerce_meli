import {useNavigate} from "react-router-dom";
import {ProductCategory} from "../adapters/productAdapter.ts";
import styled from "styled-components";


interface BreadcrumbProps {
    categories: ProductCategory[];
}

const Breadcrumb = ({categories}: BreadcrumbProps) => {
    if (!categories.length) return null;
    const navigate = useNavigate()
    const handleCategoryClick = (categoryId: string) => {
        if (categoryId !== "unknown") {
            navigate(`/items?category=${categoryId}`);
        }
    };

    return (
        <nav aria-label="breadcrumb" className="text-sm text-gray-500 py-2">
            <ul className="flex gap-2">
                {categories.map((category, index) => (
                    <li key={category.id} className="flex items-center">
                        {index !== 0 && <span className="mx-1" aria-hidden="true">›</span>}
                        {category.id === "unknown" ? (
                            <span className="text-gray-400">{category.name}</span>
                        ) : (
                            <CategoryButton
                                $isUnknown={category.id === "unknown"}
                                onClick={() => handleCategoryClick(category.id)}
                                disabled={category.id === "unknown"}
                            >
                                {category.name}
                            </CategoryButton>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;


const CategoryButton = styled.button<{ $isUnknown: boolean }>`
    background: none;
    border: none;
    font-size: inherit;
    color: inherit;
    cursor: ${(props) => (props.$isUnknown ? "default" : "pointer")};
    text-decoration: ${(props) => (props.$isUnknown ? "none" : "underline")};

    &:hover {
        text-decoration: ${(props) => (props.$isUnknown ? "none" : "underline")};
    }

    &:disabled {
        cursor: default;
    }
`;