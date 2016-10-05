import React from 'react';
import { createDevTools } from 'redux-devtools';
import Periscope from 'redux-periscope';

export default createDevTools(
    <Periscope />
);
