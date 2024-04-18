import React from 'react';

const Button = (props) => {
    const { callbackFn, classNames, btnText, navigatingRoute } = props;

    const handleBtnClick = () => {
        if(callbackFn) {
            if(navigatingRoute) {
                callbackFn(navigatingRoute, {replace: true});
            } else {
                callbackFn();
            }
        }
    };

    return (
        <div className="common-btn-box">
            <button onClick={handleBtnClick} className={classNames ? classNames : "common-btn"}>{btnText ? btnText : 'Button'}</button>
        </div>
    )
}

export default Button
