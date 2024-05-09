export const getCollections = async () => {
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`,
    {
      next: { revalidate: 100 },
    }
  );
  return await collections.json();
};

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 100 },
  });

  return await products.json();
};

export const getProductById = async (productId: string) => {
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
  );
  return await product.json();
};
