import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import Themes from 'util/StyleComponents/themes/index';
import { ThemeSwitcherProvider } from 'mui-theme-switcher';

//리덕스, 사가
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducers from 'root/RootReducer';
import RootSaga from 'root/RootSaga';

//컴포넌트

import AppContainer from 'AppContainer';
import Dashboard from 'common/page/dashboard/Dashboard';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(RootReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(RootSaga);

const render = () => {
    const state = store.getState();
    ReactDOM.render(
        <Provider store={store}>
            {state.dashReducer.startPrj === 'true' ? (
                <ThemeProvider theme={Themes.default}>
                    <ThemeSwitcherProvider
                        lightTheme={Themes.default}
                        darkTheme={Themes.darkTheme}
                        defaultTheme={'light'}
                    >
                        <AppContainer />
                    </ThemeSwitcherProvider>
                </ThemeProvider>
            ) : (
                <Dashboard />
            )}
        </Provider>,

        document.getElementById('root')
    );
};
store.subscribe(render);
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
