export const ADD_COMMENT = 'ADD_COMMENT';
export const DISHES_LOADING = 'DISHES_LOADING';//dishes are fitch perhaps from servers
export const DISHES_FAILED = 'DISHES_FAILED';//failed to fetch the dishes info from a server
export const ADD_DISHES = 'ADD_DISHES';//add the dishes into your store

export const ADD_COMMENTS = 'ADD_COMMENTS';//fetching
export const COMMENTS_FAILED = 'COMMENTS_FAILED';/*nera COMMENTS_LOADING nes comments will be loading behind the scene.
When we render our application, we'll first render the home component.By the time the home component is rendered,
the comments will also be fetched in.So, by the time we navigate to the dish details component,
the comments would have already been fetched in.So that's why I don't have a specific comments loading*/
export const PROMOS_LOADING = 'PROMOS_LOADING';
export const ADD_PROMOS = 'ADD_PROMOS';
export const PROMOS_FAILED = 'PROMOS_FAILED';

export const LEADERS_LOADING = 'LEADERS_LOADING';//
export const LEADERS_FAILED = 'LEADERS_FAILED';//
export const ADD_LEADERS = 'ADD_LEADERS';//

