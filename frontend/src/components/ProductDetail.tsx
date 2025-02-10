import { useTranslation } from "react-i18next";
import {ProductDetail} from "../adapters/productAdapter.ts";

interface ProductDetailProps {
    product: ProductDetail
}

const Product = ({ product }: ProductDetailProps) => {
    const { t } = useTranslation();

    return (
        <article className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
            </header>

            <figure className="flex justify-center">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    loading="lazy"
                    width="500"
                    height="500"
                    className="rounded-lg shadow-sm"
                />
            </figure>

            <section className="mt-4">
                <dl className="grid grid-cols-2 gap-4">
                    <div>
                        <dt className="font-semibold">{t("product_detail.price")}</dt>
                        <dd className="text-lg font-bold text-green-600">${product.price}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">{t("product_detail.condition")}</dt>
                        <dd>{product.condition === "new" ? t("new") : t("used")}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">{t("product_detail.delivery")}</dt>
                        <dd>{product.freeShipping ? t("free_shipping") : t("no_shipping_included")}</dd>
                    </div>
                </dl>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800">{t("product_detail.description")}</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </section>
        </article>
    );
};

export default Product;