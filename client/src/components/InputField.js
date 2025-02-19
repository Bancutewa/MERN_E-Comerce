import React, { memo } from 'react'

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
    // const [focus, setFocus] = useState(false);
    return (
        <div className='w-full relative'>
            {value.trim() !== '' &&
                <label
                    className='text-[10px] absolute top-0 left-[12px] block bg-white px-1 animate-slide-top-sm'
                    htmlFor={nameKey}>{nameKey?.charAt(0).toUpperCase() + nameKey?.slice(1)}
                </label>}
            <input
                type={type || "text"}
                id=''
                className='px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic'
                placeholder={nameKey?.charAt(0).toUpperCase() + nameKey?.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
            // onFocus={() => setFocus(true)}
            // onBlur={() => setFocus(false)}
            />
        </div>
    )
}

export default memo(InputField) 
