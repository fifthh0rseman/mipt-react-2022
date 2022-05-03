import React, {useEffect, useState} from 'react';

export const getRequest = (url) => fetch(url)
    .then(response => {
        if (response.status < 200 || response.status >= 400) {
            throw Error("Response failed: server crushed with error " + response.status.toString(10))
        }
        return response.json()
    })


export const getProduct = (id) => getRequest(`/api/service-product/search/${id}`)
export const getProducts = (query) => getRequest(`/api/service-product/search?text=${query}`)
export const  updateProduct = (json_value, usin) =>
    fetch('/api/service-boarding/boarding',
        {
            method: usin === undefined ? "POST" : "PUT",
            body: JSON.stringify(json_value),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })

export const useLoading = (productsDTO) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(null)

    useEffect(() => {
        setLoading(true);
        setValue(null);
        setError(null);
        productsDTO()
            .then(data => {
                setValue(data)
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [productsDTO])

    return {loading, error, data: value}
}