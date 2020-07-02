import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {/* */
    switch(action.type){
        case ActionTypes.ADD_COMMENT: 
        var comment=action.payload;
        comment.id = state.length //js array, parodo pagal id kiek yra komentaru ir tokiu budu veliau assigning the comment id in sequential order
        comment.date = new Date().toISOString();
        console.log("Comment: ", comment);
        return state.concat(comment);//concat sukuria nauja objekta kuri jau galimam grazinti
        default:
            return state;
    }
}