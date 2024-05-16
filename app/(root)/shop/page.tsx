"use client";
import { Search } from "lucide-react";
import { productsStore } from "@/app/store/products";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { collectionsStore } from "@/app/store/collections";

export default function ShopPage() {
  const [loading, setLoading] = useState(true);

  //! Récupération des produits du state global Zustand
  useEffect(() => {
    productsStore.getState().fetchProducts();
    collectionsStore.getState().fetchCollections();
    setLoading(false);
  }, []);

  const products = productsStore(
    (state: { products: ProductType[] }) => state.products
  );
  const collections = collectionsStore(
    (state: { collections: CollectionType[] }) => state.collections
  );

  console.log(products);

  //! Tri des produits
  const [selectedCollectionId, setSelectedCollectionId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCollectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCollectionId(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Produits filtrés par collection, catégorie et/ou recherche
  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCollectionId === ""
        ? true
        : product.collections.some(
            (collection: any) =>
              typeof collection === "object" &&
              collection._id === selectedCollectionId
          )) &&
      (selectedCategory === "" ? true : product.category === selectedCategory)
    );
  });

  return (
    <>
      <section className="">
        <h1 className="pt-[5rem] pb-4 text-center text-[3rem] text-white font-bold uppercase bg-noir-1 bg-grid-small-white/[0.3]">
          Shop
        </h1>
        <div className="grid md:grid-cols-3 gap-2 md:gap-1 px-4 md:px-[10rem] py-4 bg-grid-small-black/[0.1]">
          <select
            className="text-white bg-grey-3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tous les produits</option>
            <option value="Haut">Haut</option>
            <option value="Bas">Bas</option>
            <option value="Ensembles">Ensembles</option>
            <option value="Accessoires">Accessoires</option>
          </select>

          <select
            className="bg-grey-3 text-white"
            value={selectedCollectionId}
            onChange={handleCollectionChange}
          >
            <option value="">Toutes les collections</option>
            {collections.map((collection: CollectionType) => (
              <option
                className="categorie__option"
                key={collection._id}
                value={collection._id}
              >
                {collection.title}
              </option>
            ))}
          </select>

          <div className="flex gap-3 px-3 bg-grey-3 py-1 items-center">
            <input
              placeholder="Rechercher..."
              className="outline-none w-full bg-grey-3 text-white placeholder:text-white placeholder-opacity-50"
              // value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className="cursor-pointer text-white h-4 w-4" />
          </div>
        </div>
        <div className="h-full flex flex-col gap-12 justify-center items-center">
          {/* <ProductsList /> */}
          <div className="flex flex-col items-center gap-10 py-8 px-5">
            {!products || filteredProducts.length === 0 ? (
              <p className="text-[2rem] font-figtree font-semibold tracking-widest text-noir-1">
                Aucun Produit trouvé
              </p>
            ) : (
              <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                {filteredProducts.map(
                  (product: ProductType) =>
                    product.stock > 0 && (
                      <ProductCard key={product._id} product={product} />
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="px-[1rem]"></section>
    </>
  );
}
