import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Drawer from '../Drawer/Drawer'
import MenuSection from '../MenuSection/MenuSection';
import SoundSection from '../SoundSection/SoundSection';
import HardmodeSection from '../HardmodeSection/HardmodeSection';
import BoardSizeSection from '../BoardSizeSection/BoardSizeSection';
import BoardImageSection from '../BoardImageSection/BoardImageSection';
import SourceSection from '../SourceSection/SourceSection';

class GameMenu extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    items: PropTypes.array,
    options: PropTypes.object,
    errors: PropTypes.object,
    cardKeys: PropTypes.array,
    boardSizes: PropTypes.object,
    onMenuToggle: PropTypes.func,
    onSizeItemClick: PropTypes.func,
    onImageSelect: PropTypes.func,
    onStepLimitToggle: PropTypes.func,
    onRandomizeCellsToggle: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    items: [],
    options: {},
    errors: {},
    cardKeys: [],
    boardSizes: {},
    onMenuToggle: () => {},
    onSizeItemClick: () => {},
    onImageSelect: () => {},
    onStepLimitToggle: () => {},
    onRandomizeCellsToggle: () => {}
  }

  render() {
    return (
      <Drawer open={this.props.isOpen} onMenuToggle={this.props.onMenuToggle} title="Save and Back">
        <Fragment>
          <MenuSection header={<Fragment><i className="fa fa-th-large" aria-hidden="true"></i>Board size:</Fragment>}>
            <BoardSizeSection
              size={this.props.options.size}
              sizes={this.props.boardSizes}
              onSizeItemClick={this.props.onSizeItemClick} />
          </MenuSection>

          <MenuSection header={<Fragment><i className="fa fa-picture-o" aria-hidden="true"></i>Board images:</Fragment>}>
            <BoardImageSection
              list={this.props.items}
              options={this.props.options}
              cardKeys={this.props.cardKeys}
              onImageSelect={this.props.onImageSelect}
              errors={this.props.errors} />
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

          <MenuSection header={<Fragment><i class="fa fa-code" aria-hidden="true"></i>Dev info:</Fragment>}>
            <SourceSection />
          </MenuSection>
        </Fragment>
      </Drawer>
    )
  }
}

export default GameMenu;