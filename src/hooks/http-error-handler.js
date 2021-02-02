import React from 'react';

export default httpClient => {

    const [error, setError] = React.useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        //this is to clear previous errors
        setError(null);
        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    React.useEffect(() => {
        //this is to remove the old interceptors sitting in memory
        //Since this component is wrapped across other components we should remove
        //the old interceptors in memory
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.response.eject(resInterceptor);
    }, []);

    const errorHandler = () => {
        setError(null);
    }

    return [error, errorHandler];
}