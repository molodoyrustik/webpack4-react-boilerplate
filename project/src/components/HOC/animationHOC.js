import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function callback() {
  return <h1>Пожалуйста подождтите</h1>
}

const PageShell = Page => {
  return props =>
    <div className="page">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        transitionName={props.match.path === '/thanks' ? 'SlideIn' : 'SlideOut'}
      >
        <Page {...props} callback={callback}/>
      </ReactCSSTransitionGroup>
    </div>;
};

export default PageShell;
