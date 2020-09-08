import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import anime from 'animejs';
import { Flipped } from 'react-flip-toolkit';
// import { TweenMax } from 'gsap/TweenMax';
// import { TimelineLite } from 'gsap/TimelineLite';
// import { AttrPlugin } from 'gsap/AttrPlugin';

// const plugins = [ AttrPlugin ];

// const startState = {
//   autoAlpha: 0,
//   xPercent: -100
// };
// const startTo = {
//   autoAlpha: 1,
//   x: 0,
//   onStart: () => console.log('start'),
//   onUpdate: () => console.log('update'),
//   onComplete: () => console.log('complete'),
// };

@observer
class CardItemWrapper extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  onElementAppear = (el, index) => {
    // const timeline = new TimelineLite();
    // timeline.set(el, startState);
    // timeline.to(el, 0.4, {
    //   autoAlpha: 1,
    //   xPercent: 0,
    //   delay: (index + 5) * 0.1,
    //   onStart: () => console.log('start'),
    //   onUpdate: () => console.log('update'),
    //   onComplete: () => console.log('complete'),
    // });
    anime({
      targets: el,
      opacity: [0, 1],
      translateX: ['-100%', 0],
      delay: (index + 3) * 100,
      easing: 'easeOutElastic',
      elasticity: 300,
    });
  };

  onElementExit = (el, index, removeElement) => {
    // const timeline = new TimelineLite();
    // timeline.to(el, 0.4, {
    //   autoAlpha: 0,
    //   xPercent: -100,
    //   onComplete: removeElement,
    // });
    anime({
      targets: el,
      translateX: '-100%',
      opacity: 0,
      complete: removeElement,
      duration: 400,
      easing: 'linear',
    });
  };

  render() {
    const { id, children } = this.props;
    return (
      <Flipped
        flipId={id}
        onExit={this.onElementExit}
        // onAppear={this.onElementAppear}
        stagger='card-list'
      >
        {children}
      </Flipped>
    );
  }
}

export { CardItemWrapper };
export default CardItemWrapper;
