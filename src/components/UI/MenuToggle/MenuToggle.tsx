import React from 'react';
import classes from './MenuToggle.module.css';

interface MenuToggleProps {
  onToggle: any;
  isOpen: boolean;
}

const MenuToggle = (props: MenuToggleProps) => {
  const cls = [classes.MenuToggle];

  if (props.isOpen) {
    cls.push(classes.open);
  }

  return (
    <div className={cls.join(' ')} onClick={props.onToggle}>
      {props.isOpen ? <div>←</div> : <div>Menu</div>}
    </div>
  );
};

export default MenuToggle;
