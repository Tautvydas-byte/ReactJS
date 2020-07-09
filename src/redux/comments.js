//import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = /*COMMENTS*/
    {
        errMess:null,
        comments:[]

    }, action) => {/* */
        switch (action.type) {
            case ActionTypes.ADD_COMMENTS:
              return {...state, errMess: null, comments: action.payload};
        
            case ActionTypes.COMMENTS_FAILED:
              return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT: //adding for new comment
        var comment = action.payload;   
        //comment.id = state.comments.length //js array, parodo pagal id kiek yra komentaru ir tokiu budu veliau assigning the comment id in sequential order. Automatisakai sukuriamas serverio todel nereikia
        //comment.date = new Date().toISOString(); //idejom i postComment
        console.log("Comment: ", comment);
        return { ...state, comments: state.comments.concat(comment)};//concat sukuria nauja objekta kuri jau galimam grazinti
        default:
            return state;
    }
};