import React from "react";
import { Switch, Route } from "react-router-dom";
import ColorPalette from "../components/ColorPalette";
import ControllerErrors from "../components/ControllerErrors";
import ModalsContainer from "../components/ModalsContainer";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import ProcessView from "../components/ProcessView";


const AppRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <PageWrapper>
            <ProcessView />
          </PageWrapper>
        </Route>
        <Route path='/color'>
          <PageWrapper>
            <ColorPalette />
          </PageWrapper>
        </Route>
        <Route path='/errors'>
          <PageWrapper>
            <ControllerErrors />
          </PageWrapper>
        </Route>
      </Switch>

      <ModalsContainer />
    </>

  )
}

export default AppRouter