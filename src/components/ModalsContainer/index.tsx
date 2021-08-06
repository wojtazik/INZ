import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsColorsListModalOpen } from '../../store/selectors/modalsSelectors'
import ColorsListModal from '../Modals/ColorsListModal'

const ModalsContainer = () => {
  const isColorsListModalOpen = useSelector(selectIsColorsListModalOpen)
  
  return (
    <>
      { isColorsListModalOpen && <ColorsListModal />}
    </>
  )
}



export default ModalsContainer