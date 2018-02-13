import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';



import Drawer from '../Drawer/Drawer'
import MenuSection from '../MenuSection/MenuSection';
import SoundSection from '../SoundSection/SoundSection';
import HardmodeSection from '../HardmodeSection/HardmodeSection';
import BoardSizeSection from '../BoardSizeSection/BoardSizeSection';
import BoardImageSection from '../BoardImageSection/BoardImageSection';

import { BOARD_SIZES } from '../GameShellService';

class GameMenu extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    items: PropTypes.array,
    options: PropTypes.object,
    errors: PropTypes.object,
    onMenuToggle: PropTypes.func,
    onSizeItemClick: PropTypes.func,
    onImageSelect: PropTypes.func,
    onStepLimitToggle: PropTypes.func,
    isOptionsInvalid: PropTypes.func,
    onRandomizeCellsToggle: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    items: [],
    options: {},
    errors: {},
    onMenuToggle: () => {},
    onSizeItemClick: () => {},
    onImageSelect: () => {},
    onStepLimitToggle: () => {},
    isOptionsInvalid: () => {},
    onRandomizeCellsToggle: () => {}
  }

  render() {
    const opti = this.props.isOptionsInvalid();

    return (
      <Drawer open={this.props.isOpen} onMenuToggle={this.props.onMenuToggle} title="Save and Back">
        <Fragment>
          <MenuSection header={<Fragment><i className="fa fa-th-large" aria-hidden="true"></i>Board size:</Fragment>}>
            <BoardSizeSection sizes={BOARD_SIZES} size={this.props.options.size} onSizeItemClick={this.props.onSizeItemClick} />
          </MenuSection>

          <MenuSection header={<Fragment><i className="fa fa-picture-o" aria-hidden="true"></i>Board images:</Fragment>}>
            <BoardImageSection list={this.props.items} onImageSelect={this.props.onImageSelect} errors={this.props.errors} />
          </MenuSection>

          <MenuSection header={<Fragment><i className="fa fa-step-forward" aria-hidden="true"></i>Hardmode options:</Fragment>}>
            <HardmodeSection
              options={this.props.options}
              onStepLimitToggle={this.props.onStepLimitToggle}
              onRandomizeCellsToggle={this.props.onRandomizeCellsToggle} />
          </MenuSection>

          <MenuSection header={<Fragment><i className="fa fa-music" aria-hidden="true"></i>Sound list:</Fragment>}>
            <SoundSection />
          </MenuSection>
        </Fragment>
      </Drawer>
    )
  }
}

export default GameMenu;