export interface IWishListCardProps {
  image: string;
  name: string;
  author: string;
}

export function WishListCard(props: IWishListCardProps) {
  return (
    <article className="cart-card">
      <img src={props.image} alt={`${props.name} image`} />
      <section className="product-info">
        <p className="product-name">{props.name}</p>
        <p>{props.author}</p>
      </section>
    </article>
  );
}
