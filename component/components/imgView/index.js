import React, { Component } from 'react'
// react-viewer 2.8.1
import Viewer from './react-viewer.js'
//import 'react-viewer/dist/index.css'

class imgView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }
  setViewerContainer = (container) => {
    this.setState({ container, visible: true });
  }
  render() {
    const images = [{ src: this.props.imgUrl, alt: '' }]
    return (
      <div ref={this.setViewerContainer} style={{ width: '100%', height: '100%' }}>
        {this.state.visible && <Viewer
          visible
          images={images}
          container={this.state.container}
          noNavbar
          noClose

        />
        }
      </div>
    )
  }
}
export default imgView