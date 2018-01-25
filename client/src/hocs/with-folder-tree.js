import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addImageToCarousel } from '../redux/carousel/actions'
import { getArchiveName, getFolders } from '../redux/tree-folder/selectors'


export default (WrapClass) => {
  class WithFolderTree extends PureComponent {
    render() {
      return (
        <div>
          {
            this.props.folders.name && <WrapClass
              folders={this.props.folders}
              archiveName={this.props.archiveName}
              onAddImage={this.props.onAddImage}
            />
          }
        </div>
      )
    }
  }

  WithFolderTree.propTypes = {
    folders: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.array,
      size: PropTypes.number,
      type: PropTypes.string,
    }).isRequired,
    archiveName: PropTypes.string.isRequired,
    onAddImage: PropTypes.func.isRequired,
  }

  const mapStateToProps = (state, props) => ({
    folders: getFolders(state, props),
    archiveName: getArchiveName(state, props),
  })

  const mapDispatchToProps = (dispatch) => ({
    onAddImage: (img) => {
      dispatch(addImageToCarousel(img))
    },
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithFolderTree)
}
