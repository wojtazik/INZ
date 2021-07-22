import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Id } from "../../model/commonTypes";
import { selectPaintsIds } from "../../store/selectors/paintsSelectors";
import ColorTankData from "./ColorTankData";
import CleaningSubstanceTankData from "./CleaningSubstanceTankData";
import MixingTankData from "./MixingTankData";

const ProcessView = () => {

  const paintsIds = useSelector(selectPaintsIds)

  const renderPaintsDataContainers = useCallback(() => {
    return paintsIds.map((id: Id) => (
      <ColorTankData
        id={id}
      />
    ))
  }, [paintsIds])

  return (
    <TanksDataGridWrapper>
      {/* {renderPaintsDataContainers()}
      <CleaningSubstanceTankData /> */}
      <MixingTankData />
    </TanksDataGridWrapper>
  )
}

const TanksDataGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, minmax(150px, auto));
  grid-row-gap: 50px;
  column-gap: 50px;
  max-height: 60%;
`

export default ProcessView