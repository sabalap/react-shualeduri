// https://fakerapi.it/api/v1/users

export const getUsers = async (quantity = '', gender = '') => {
    try {
        const response = await fetch(
            `https://fakerapi.it/api/v1/users?_quantity=${quantity}&_gender=${gender}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        );

        return await response.json();
    } catch (err) {
        console.trace(err);
    }
};