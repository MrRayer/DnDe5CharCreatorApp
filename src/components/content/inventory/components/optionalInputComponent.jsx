export default function OptionalInputComponent({flag,flagSetter,title,ref,type,defVal}) {
    return (
        <div className="add-item-optional-container">
            <div className="add-item-optional-x-container"
                onClick={() => { flag ? flagSetter(false) : flagSetter(true) }}>
                <h1 className="add-item-optional-checks">{flag && "X"}</h1>
            </div>
            <div className="add-item-optional-content-container">
                <h1 className="add-item-label">{title}</h1>
                {flag && <input ref={ref}
                                className="add-item-input"
                                type={type}
                                defaultValue={defVal}/>}
            </div>
        </div>
    )
}