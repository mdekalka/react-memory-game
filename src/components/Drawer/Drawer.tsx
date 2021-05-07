import { useRef, ReactNode, RefObject } from 'react';
import cx from 'classnames';

import useOnClickOutside  from '../../hooks/useOutsideClick';

import './Drawer.scss';

interface DrawerProps {
  opened: boolean
  position: 'right' | 'left'
  onClose: () => void
  blackout?: boolean
  preventClose?: boolean
  closeOutside?: boolean
  children?: ReactNode
}

interface CloseOutsideProps<T> {
  targetRef: RefObject<T>
  callback: () => void
}
// Since we can't use optional hooks - create a dummy component to cover click outside case.
const CloseOutside = <T extends HTMLElement = HTMLElement>({ targetRef, callback }: CloseOutsideProps<T>) => {
  useOnClickOutside(targetRef, callback);

  return null;
}

export const Drawer = ({ opened, position, blackout, children, onClose, preventClose, closeOutside }: DrawerProps) => {
  const ref = useRef(null);

  const handleClose = () => {
    !preventClose && onClose();
  }

  return (
    <div className={cx('drawer', { opened, blackout, [position]: true, 'prevent-close': preventClose })}>
      <div className="drawer-blackout"></div>
      {(closeOutside && !preventClose) && <CloseOutside targetRef={ref} callback={onClose} />}
      <div className="drawer-content" ref={ref}>
        <button className="btn shadow drawer-close" onClick={handleClose}>
          <i className="fa fa-close" aria-hidden="true"></i>
        </button>
        {children}
      </div>
    </div>
  )

}

export default Drawer;
