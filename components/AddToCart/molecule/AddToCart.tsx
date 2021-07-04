import React, { ChangeEvent } from "react";
import { Product } from "types";
import AddToCartContainer from "../atom/AddToCartContainer";
import ChangeButton from "../atom/ChangeButton";
import Amount from "../atom/Amount";
import { FC } from "react";
import styled from 'styled-components';
import Button from 'components/Button/Button'
import NoValidationInput from "components/Input/molecule/NoValidationInput";

interface Props {
  onAdd: () => void;
  onRemove: () => void;
  onManageInput: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCartChange: (product: any, number: number) => void;
  useInput: boolean;
  cartNumber: number;
  product: Product;
};

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const BottomContainer = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  display: flex;

  > * {
    flex: 1 0 100%;
  }
`;

const AddToCart:FC<Props> = ({
  onAdd,
  onManageInput,
  onRemove,
  onChange,
  onCartChange,
  useInput,
  cartNumber,
  product,
}) => {
  const productImage = product.images.length ? product.images[0].src : DEFAULT_PLACEHOLDER_IMAGE;
  const PRODUCT = {
    ...product,
    productImage
  };

  const onClick = () => {
    if (useInput) return onManageInput();
    return onCartChange(PRODUCT, cartNumber);
  }

  return (
    <AddToCartContainer>
      <TopContainer>
        <ChangeButton disabled={cartNumber <= 1} onClick={onRemove} />
        {useInput ? (
          <NoValidationInput onChange={onChange} value={`${cartNumber}`} />
        ) : (
          <Amount>{cartNumber}</Amount>
        )}
        <ChangeButton isPlusButton onClick={onAdd} disabled={false} />
      </TopContainer>
      <BottomContainer>
        <Button onClick={onClick} primary>
          {useInput
            ? "Mettre à jour"
            : "Ajouter au panier"}
        </Button>
      </BottomContainer>
    </AddToCartContainer>
  );
}

export default AddToCart;
