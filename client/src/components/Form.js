import clsx from 'clsx'
import React, { memo } from 'react'

const Form = ({ fullWith, label, disabled, register, errors, id, validate, type, placeholder, defaultValue, style }) => {
    return (
        <div className={clsx('flex flex-col h-[78px] gap-2', style)}>
            {label && <label htmlFor={id}>{label}</label>}
            <input defaultValue={defaultValue} type={type || 'text'} id={id} {...register(id, validate)} disabled={disabled} placeholder={placeholder} className={clsx('form-input', fullWith && 'w-full')} />
            {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default memo(Form)