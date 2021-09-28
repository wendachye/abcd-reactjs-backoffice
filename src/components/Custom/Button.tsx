import { useMemo, FC } from 'react';
import { Button } from 'reactstrap';
import _ from 'lodash';

interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  color?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  debounce?: boolean;
  uppercase?: boolean;
  onClick?: () => void | undefined;
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  type = 'button',
  className,
  color,
  size,
  disabled,
  loading,
  debounce,
  uppercase,
  onClick,
}) => {
  const debounceOnClick = useMemo(
    () =>
      onClick
        ? _.debounce(onClick, 600, {
            leading: true,
            trailing: false,
          })
        : onClick,
    [onClick],
  );

  return (
    <Button
      type={type}
      className={className}
      color={color}
      size={size}
      disabled={disabled}
      onClick={!debounce ? debounceOnClick : onClick}
    >
      {uppercase && typeof children === 'string' ? children.toUpperCase() : children}
      {loading && (
        <img
          style={{
            maxHeight: 20,
            paddingLeft: 5,
          }}
          src={require('assets/img/loading-white.svg').default}
          alt={'loading'}
        />
      )}
    </Button>
  );
};

export default CustomButton;
