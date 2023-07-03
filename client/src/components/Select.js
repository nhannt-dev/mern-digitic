import clsx from 'clsx'
import React, { memo } from 'react'

const Select = ({ label, options = [], register, errors, id, validate, style, fullwidth, defauValue }) => {
    return (
        <div className={clsx('flex flex-col gap-2', style)}>
            {label && <label htmlFor={id}>{label}</label>}
            <select defaultValue={defauValue} className={clsx('form-select', fullwidth && 'w-full', style)} id={id} {...register(id, validate)}>
                <option>Select</option>
                {options?.map((el, index) => (
                    <option value={el.code} key={index}>{el.value}</option>
                ))}
            </select>
            {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default memo(Select)