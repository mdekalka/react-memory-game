import { useState } from 'react';

import Drawer from '../Drawer/Drawer';
import MenuSection from '../MenuSection/MenuSection';
import HardmodeSection from '../HardmodeSection/HardmodeSection';
import BoardSelectionSection from '../BoardSelectionSection/BoardSelectionSection';
import CardSelectionSection from '../CardSelectionSection/CardSelectionSection';

import './SettingsMenu.scss';


interface SettingsMenuProps {
  options: GameConfig
  onOptionsUpdate: (newOptions: Partial<GameConfig>) => void
}

const SettingsMenu = ({ options, onOptionsUpdate }: SettingsMenuProps) => {
  const [ opened, setOpened ] = useState(false);
  const [ preventClose, setPreventClose ] = useState(false);

  const onError = (hasError?: boolean) => {
    setPreventClose(!!hasError);
  } 

  return (
    <>
      <button className="btn shadow open-settings" onClick={() => setOpened(true)}>
        <i className="fa fa-sliders" aria-hidden="true"></i>
      </button>
      <Drawer opened={opened} position="left" onClose={() => setOpened(false)} blackout closeOutside preventClose={preventClose}>
        <MenuSection header={<><i className="fa fa-th-large" aria-hidden="true"></i>Board size:</>}>
          <BoardSelectionSection options={options} onOptionsUpdate={onOptionsUpdate} />
        </MenuSection>

        <MenuSection header={<><i className="fa fa-picture-o" aria-hidden="true"></i>Board cards:</>}>
          <CardSelectionSection options={options} onOptionsUpdate={onOptionsUpdate} onError={onError} />
        </MenuSection>

        <MenuSection header={<><i className="fa fa-step-forward" aria-hidden="true"></i>Hardmode options:</>}>
          <HardmodeSection options={options} onOptionsUpdate={onOptionsUpdate} />
        </MenuSection>
      </Drawer>
    </>
  )
}

export default SettingsMenu;
