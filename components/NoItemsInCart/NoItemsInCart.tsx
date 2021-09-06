import Link from 'next/link';

const INDEX_PATH = "/";

const NoItemsInCart = () => {
  return (
    <>
      <h1 className="text-center">
        Vous n'avez pas encore d'articles dans votre panier. Ajoutez des
        articles afin de pouvoir envoyer votre soumission.
      </h1>
      <Link href={INDEX_PATH}>
        <a className="text-center text-primary">
          <h1>Retour au catalogue</h1>
        </a>
      </Link>
    </>
  )
};

export default NoItemsInCart;
