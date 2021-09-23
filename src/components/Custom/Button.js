import { useMemo } from 'react';
import { Button } from 'reactstrap';
import { debounce } from 'lodash';

const CustomButton = (props) => {
  const {
    children,
    className,
    color,
    disabled,
    link,
    loading,
    loadingLabel,
    loadingColor,
    onClick,
    size,
    type,
    disableBlock,
    ...rest
  } = props;

  const debounceOnClick = useMemo(
    () =>
      onClick
        ? debounce(onClick, 600, {
            leading: true,
            trailing: false,
          })
        : onClick,
    [onClick],
  );

  return (
    <Button
      {...rest}
      className={className}
      color={color}
      disabled={disabled}
      type={type ?? 'button'}
      size={size}
      onClick={!disableBlock ? debounceOnClick : onClick}
    >
      {loading && loadingLabel ? (
        <span style={{ marginRight: 10 }}>{loadingLabel}</span>
      ) : (
        <>{children}</>
      )}
      {loading && (
        <img
          style={{
            maxHeight: 20,
            paddingLeft: 5,
          }}
          src={
            loadingColor
              ? require('assets/img/loading.svg').default
              : require('assets/img/loading-white.svg').default
          }
          alt={'noorders'}
        />
      )}
    </Button>
  );
};

export default CustomButton;
