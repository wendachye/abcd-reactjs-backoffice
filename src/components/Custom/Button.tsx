import { useMemo, FC, memo } from 'react';
import { Button } from 'reactstrap';
import _ from 'lodash';

interface CustomButtonProps {
  children: React.ReactNode;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  debounce?: boolean;
  uppercase?: boolean;
  onClick?: () => void | undefined;
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  id,
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
      id={id}
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

export default memo(CustomButton);
