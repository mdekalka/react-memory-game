import { ReactNode } from 'react';

import './MenuSection.scss';


interface MenuSectionProps {
  header?: ReactNode
  children?: ReactNode
}

const MenuSection = ({ header, children }: MenuSectionProps) => {
  return (
    <div className="menu-section">
      <h6 className="menu-section-title">{header}</h6>
      <div className="menu-section-content">{children}</div>
    </div>
  )
}

export default MenuSection;
