


const UncontrolableSwitch = (val) => {
    return (
        <label className="custom-toggle d-block mx-auth">
            <input checked={val} disabled type="checkbox" />
            <span className="custom-toggle-slider rounded-circle" />
        </label>
    )
}

export default UncontrolableSwitch