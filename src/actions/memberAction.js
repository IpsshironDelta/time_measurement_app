export const UPDATE_FORM   = 'UPDATE_FORM';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';

export const updateForm = form => {
    return {
        type: UPDATE_FORM,
        payload: form
    }
}

export const updateRecipe = recipe => {
    return {
        type: UPDATE_RECIPE,
        payload: recipe
    }
}
