import { useState } from "react";

export default function useLogIn({initialValue}) {
    const [value,setValue] = useState(initialValue);
    // const [error,setError] = useState(false);

    // const [loading,setLoading] = useState(false);
    // const [user,setUser] = useState(null);

    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(value);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        await onSubmit(value);
        setIsSubmitting(false);
    }
  };


    return {value,onChange,handleSubmit}
}