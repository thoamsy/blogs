import React, {
  PureComponent,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import './Toggle.css';

// Copyright 2015-present Drifty Co.
// http://drifty.com/
// from: https://github.com/driftyco/ionic/blob/master/src/util/dom.ts
function pointerCoord(event) {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (event) {
    const changedTouches = event.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      const touch = changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    const pageX = event.pageX;
    if (pageX !== undefined) {
      return { x: pageX, y: event.pageY };
    }
  }
  return { x: 0, y: 0 };
}

const Toggle = props => {
  const input = useRef(null);
  const touchParams = useRef({
    moved: false,
    previouslyChecked: !!(props.checked || props.defaultChecked),
    touchMoved: false,
    startX: null,
    hadFocusAtTouchStart: false,
    touchStarted: false,
  });

  const [checked, setChecked] = useState(
    !!(props.checked || props.defaultChecked)
  );
  const [hasFocus, setFocus] = useState(false);

  if (props.checked !== checked) {
    setChecked(props.checked);
  }

  const handleClick = useCallback(
    event => {
      const checkbox = input.current;
      touchParams.current.previouslyChecked = checkbox.checked;

      if (event.target !== checkbox && touchParams.current.moved) {
        event.preventDefault();
        checkbox.focus();
        checkbox.click();
        return;
      }
      setChecked(!checkbox.checked);
    },
    [input, touchParams]
  );

  const handleTouchStart = useCallback(
    event => {
      Object.assign(touchParams.current, {
        startX: pointerCoord(event).x,
        touchStarted: true,
        hadFocusAtTouchStart: hasFocus,
      });
      setFocus(true);
    },
    [touchParams]
  );

  const handleTouchMove = useCallback(
    event => {
      if (!touchParams.current.touchStarted) return;
      touchParams.current.touchMoved = true;

      const { startX } = touchParams.current;
      if (startX != null) {
        let currentX = pointerCoord(event).x;
        if (checked && currentX + 15 < startX) {
          setChecked(false);
          touchParams.current.startX = currentX;
        } else if (!checked && currentX - 15 > startX) {
          setChecked(true);
          touchParams.current.startX = currentX;
        }
      }
    },
    [touchParams]
  );

  const handleTouchEnd = useCallback(
    event => {
      const {
        touchMoved,
        startX,
        previouslyChecked,
        hadFocusAtTouchStart,
      } = touchParams.current;
      if (!touchMoved) return;
      const checkbox = input.current;
      event.preventDefault();

      if (startX != null) {
        if (previouslyChecked !== checked) {
          checkbox.click();
        }

        Object.assign(touchParams.current, {
          touchedStarted: false,
          startX: null,
          touchMoved: false,
        });
      }

      if (!hadFocusAtTouchStart) {
        setFocus(false);
      }
    },
    [touchParams]
  );

  const handleTouchCancel = useCallback(
    () => {
      const { startX, hadFocusAtTouchStart } = touchParams.current;

      startX != null &&
        Object.assign(touchParams.current, {
          touchStarted: false,
          startX: null,
          touchMoved: false,
        });

      if (hadFocusAtTouchStart) {
        setFocus(false);
      }
    },
    [touchParams]
  );

  const handleFocus = useCallback(
    event => {
      props.onFocus && props.onFocus(event);

      touchParams.current.hadFocusAtTouchStart = true;
      setFocus(true);
    },
    [touchParams]
  );

  const handleBlur = useCallback(
    event => {
      props.onBlur && props.onBlur(event);
      touchParams.hadFocusAtTouchStart = false;
      setFocus(false);
    },
    [touchParams]
  );

  const getIcon = type => {
    const { icons } = props;
    if (!icons) {
      return null;
    }
    return icons[type] === undefined
      ? Toggle.defaultProps.icons[type]
      : icons[type];
  };

  const { className, icons: _icons, disabled, ...inputProps } = props;
  const classes =
    'react-toggle' +
    (checked ? ' react-toggle--checked' : '') +
    (hasFocus ? ' react-toggle--focus' : '') +
    (disabled ? ' react-toggle--disabled' : '') +
    (className ? ' ' + className : '');

  return (
    <div
      className={classes}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <div className="react-toggle-track">
        <div className="react-toggle-track-check">{getIcon('checked')}</div>
        <div className="react-toggle-track-x">{getIcon('unchecked')}</div>
      </div>
      <div className="react-toggle-thumb" />

      <input
        {...inputProps}
        checked={checked}
        ref={input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="react-toggle-screenreader-only"
        type="checkbox"
        aria-label="Switch between Dark and Light mode"
      />
    </div>
  );
};
export default Toggle;
