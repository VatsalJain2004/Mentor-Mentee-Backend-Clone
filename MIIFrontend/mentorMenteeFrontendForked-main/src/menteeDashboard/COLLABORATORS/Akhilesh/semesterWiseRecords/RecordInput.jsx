import propTypes from "prop-types";

const Input = ({title, id, defaultValue, disabled}) => {
    return (
        <>
            <label htmlFor={id} className="block text-md font-medium text-white capitalize">{title}</label>
            <input type="text" id={id} className="bg-gray-50 text-gray-900 text-md block w-full p-2.5 outline-none" placeholder="Enter details" required defaultValue={defaultValue} disabled={disabled} />
        </>
    )
}

Input.propTypes = {
    title: propTypes.string,
    id: propTypes.string,
    defaultValue: propTypes.any,
    disabled: propTypes.any
}
export default Input;