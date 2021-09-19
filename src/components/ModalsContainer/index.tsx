import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsColorNameModalOpen, selectIsColorsListModalOpen } from '../../store/selectors/modalsSelectors'
import ColorNameModal from '../Modals/ColorNameModal'
import ColorsListModal from '../Modals/ColorsListModal'

const ModalsContainer = () => {
  const isColorsListModalOpen = useSelector(selectIsColorsListModalOpen)
  const isColorNameModalOpen = useSelector(selectIsColorNameModalOpen)
  
  return (
    <>
      { isColorsListModalOpen && <ColorsListModal />}
      { isColorNameModalOpen && <ColorNameModal /> }
    </>
  )
}

export default ModalsContainer