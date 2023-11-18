import React, { createContext } from "react";
import { appReducer } from "./app.reducer";

const AppContext = createContext();

class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dispatchAppAction: (action) => {
        this.setState((prevState) => props.reducer(prevState, action));
      },
    };
  }

  render() {
    const {
      props: { children },
    } = this;
    const { dispatchAppAction, ...others } = this.state;
    return (
      <AppContext.Provider value={{ dispatchAppAction, state: others }}>
        {children}
      </AppContext.Provider>
    );
  }
}

const withAppProvider = (WrappedComponent) => {
  return (props) => {
    return (
      <AppProvider reducer={appReducer}>
        <WrappedComponent {...props} />
      </AppProvider>
    );
  };
};

const AppConsumer = ({ children, allProps }) => {
  return (
    <AppContext.Consumer>
      {(appContext) => {
        return children({ allProps, appContext: { ...appContext } });
      }}
    </AppContext.Consumer>
  );
};

const withAppConsumer = (WrappedComponent) => {
  return (props) => {
    return (
      <AppConsumer allProps={props}>
        {({ appContext }) => (
          <WrappedComponent {...props} appContext={appContext} />
        )}
      </AppConsumer>
    );
  };
};

export { withAppProvider, AppContext, withAppConsumer };
