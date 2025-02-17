import { useTranslation } from "react-i18next";
import { ProductDetail } from "../adapters/productAdapter.ts";

interface ProductDetailProps {
    product: ProductDetail;
}

const Product = ({ product }: ProductDetailProps) => {
    const { t } = useTranslation();

    return (
        <article className="container mx-auto grid grid-cols-12 gap-6 p-6 bg-white shadow-md rounded-lg">
            <figure className="col-span-6 flex justify-center">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    loading="lazy"
                    width="500"
                    height="500"
                    className="rounded-lg shadow-sm"
                />
            </figure>

            <section className="col-span-6 flex flex-col justify-start">
                <p className="text-sm --color-mlLightGray">
                    {product.condition === "new" ? t("new") : t("used")} - {product.soldQuantity} {t("sold")}
                </p>

                <h1 className="text-[24px]  --color-mlGray">{product.title}</h1>



                <p className="text-[46px] --color-mlGray my-8">${product.price}</p>

                <button className="w-[250px] bg-[#3483FA] text-white py-3 px-6 rounded-md mt-4 text-lg font-semibold">
                    {t("buy")}
                </button>
            </section>

            <section className="col-span-12 ml-8 pt-6">
                <h2 className="text-[28px] --color-mlGray my-8">{t("product_detail.description")}</h2>
                <p className="text-[16px] --color-mlLightGray leading-relaxed">{product.description}</p>
            </section>
        </article>
    );
};

export default Product;