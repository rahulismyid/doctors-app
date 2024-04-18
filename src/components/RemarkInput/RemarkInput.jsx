const RemarkInput = (props) => {
    const { option, onChange } = props;

    const renderInputFieldForRemark = (option) => {
        const REMARK = "remark";

        if(option && option.hasOwnProperty('key') || Object.values(option).includes(REMARK)) {
            return (
                <input className='medical-exam-input-fields remark-input' placeholder="Remark" type="text" />
            )
        }
        return null;
    };

    return (
        <>
            {renderInputFieldForRemark(option)}
        </>
    )
}

export default RemarkInput
