import { BurgerConstructorElementUI } from '@ui';
import { FC, memo } from 'react';
import {
  moveDown,
  moveUp,
  removeIngredient
} from '../../services/constructor/slice';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveDown(index));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveUp(index));
      }
    };

    const handleClose = () => {
      dispatch(removeIngredient(index));
    };
    const cannotRemove = ingredient.type === 'bun';

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
        isLocked={cannotRemove}
      />
    );
  }
);
