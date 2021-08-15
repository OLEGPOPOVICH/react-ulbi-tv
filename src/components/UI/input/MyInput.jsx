import { forwardRef } from 'react';
import classes from './MyInput.module.css';

export const MyInput = forwardRef(({
  children,
  ...props
}, ref) => {

  return (
    <input
      className={classes.myInput}
      ref={ref}
      {...props}
    />
  );
});