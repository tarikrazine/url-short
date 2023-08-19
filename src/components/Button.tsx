"use client"

import { experimental_useFormStatus as formStatus } from "react-dom"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode}

function Button(props: ButtonProps) {

    const { pending } = formStatus()

    return <button disabled={pending} type={props.type} className={props.className} {...props}>{pending ? "Charging..." : props. children}</button>
}

export default Button