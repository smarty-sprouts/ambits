export const loadAmbits   = (ambits)  => ({ type: 'LOAD_AMBITS'   , ambits  });

export const updateAmbit  = (ambit)   => ({ type: 'UPDATE_AMBIT'  , ambit   });

export const updateTitle  = (title)   => ({ type: 'UPDATE_TITLE'  , title   });

export const editCurBit = (editAmbit)   => ({ type: 'EDIT_CUR_BIT', editAmbit   });

export const updateCurDay = (day)     => ({ type: 'UPDATE_CUR_DAY', day     });

export const updateCurBit = (ambit)   => ({ type: 'UPDATE_CUR_BIT', ambit   });

export const deleteAmbit  = (ambit)   => ({ type: 'DELETE_AMBIT'  , ambit   });

export const isDisabled   = (bool)    => ({ type: 'IS_DISABLED'   , bool    });
