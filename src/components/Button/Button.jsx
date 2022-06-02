import PropTypes from 'prop-types';
import css from './Button.module.css';
export default function Button({ text,onLoadMore }) {
    return (
        <div className={css.btnContainer}>
        <button className="Button" type="button" onClick={onLoadMore}>
            {text}
        </button>
        </div>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
};