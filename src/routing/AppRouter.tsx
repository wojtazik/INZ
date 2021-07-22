import React from "react";
import { Switch, Route } from "react-router-dom";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import ProcessView from "../components/ProcessView";


const AppRouter = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <PageWrapper>
          <ProcessView />
        </PageWrapper>
      </Route>
      <Route path='/color'>
        <PageWrapper>
          Color
        </PageWrapper>
      </Route>
      <Route path='/errors'>
        <PageWrapper>
          errors
        </PageWrapper>
      </Route>
    </Switch>  
  )
}

export default AppRouter