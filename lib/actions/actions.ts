export const getCollections = async () => {
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`,
    {
      next: { revalidate: 100 },
    }
  );
  return await collections.json();
};

export const getLastCollectionImage = async () => {
  const collections = await getCollections();
  const lastCollection = collections[collections.length - 1];
  return lastCollection.image;
};

export const getCollectionDetails = async (collectionId: string) => {
  const collection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`,
    { cache: "no-store" }
  );
  return await collection.json();
};

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 1000 },
  });

  return await products.json();
};

export const getProductById = async (slug: string) => {
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
    { cache: "no-store" }
  );
  return await product.json();
};

export const getOrders = async (customerId: string) => {
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`,

    { cache: "no-store" }
  );
  return await orders.json();
};

export const getRelatedProducts = async (productId: string) => {
  const relatedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`
  );
  return await relatedProducts.json();
};
