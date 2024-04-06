// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseQuery = <T extends Record<string, any>, K>(query: T): Record<string | number, K> => {
    const keys: (keyof T)[] = Object.keys(query);
    return keys.reduce((accumulator, queryKey) => {
        if (typeof query[queryKey] === 'string') {
            try {
                accumulator[queryKey] = JSON.parse(query[queryKey]);
            } catch {
                accumulator[queryKey] = query[queryKey];
            }
        } else {
            accumulator[queryKey] = query[queryKey];
        }
        return accumulator;
    }, {} as T);
};
